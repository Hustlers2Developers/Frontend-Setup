"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { graphqlRequest, LOGIN_MUTATION, REGISTER_MUTATION, REFRESH_TOKENS_MUTATION } from "./graphql-client";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  getAccessToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "h2d_tokens";
const USER_KEY = "h2d_user";

function parseJwt(token: string): { exp: number; sub: string; email?: string; name?: string } | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token);
  if (!payload) return true;
  return Date.now() >= payload.exp * 1000;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveTokens = (tokens: AuthTokens) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  };

  const getTokens = (): AuthTokens | null => {
    const stored = localStorage.getItem(TOKEN_KEY);
    return stored ? JSON.parse(stored) : null;
  };

  const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const setUserFromToken = (accessToken: string, email?: string, name?: string) => {
    const payload = parseJwt(accessToken);
    if (payload) {
      const userData: User = {
        id: payload.sub,
        name: name || payload.name || "Developer",
        email: email || payload.email || "",
        role: "member",
      };
      setUser(userData);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
    }
  };

  const refreshTokens = useCallback(async (): Promise<string | null> => {
    const tokens = getTokens();
    if (!tokens?.refreshToken) return null;

    try {
      const data = await graphqlRequest<{ refreshTokens: AuthTokens }>(
        REFRESH_TOKENS_MUTATION,
        undefined,
        tokens.refreshToken
      );
      saveTokens(data.refreshTokens);
      return data.refreshTokens.accessToken;
    } catch {
      clearAuth();
      return null;
    }
  }, []);

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    const tokens = getTokens();
    if (!tokens?.accessToken) return null;
    
    if (isTokenExpired(tokens.accessToken)) {
      const newToken = await refreshTokens();
      return newToken;
    }
    
    return tokens.accessToken;
  }, [refreshTokens]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const tokens = getTokens();
        if (!tokens?.accessToken) {
          setIsLoading(false);
          return;
        }

        if (isTokenExpired(tokens.accessToken)) {
          const newToken = await refreshTokens();
          if (newToken) {
            setUserFromToken(newToken);
          }
        } else {
          const storedUser = localStorage.getItem(USER_KEY);
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            setUserFromToken(tokens.accessToken);
          }
        }
      } catch {
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [refreshTokens]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await graphqlRequest<{ login: AuthTokens }>(
        LOGIN_MUTATION,
        { email, password }
      );
      saveTokens(data.login);
      setUserFromToken(data.login.accessToken, email);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const data = await graphqlRequest<{ register: AuthTokens }>(
        REGISTER_MUTATION,
        { email, password, name }
      );
      saveTokens(data.register);
      setUserFromToken(data.register.accessToken, email, name);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
