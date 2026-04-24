"use client";

import { Github, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <nav className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-xl font-bold tracking-tight text-foreground">
          H2D
        </a>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <a 
                href="/profile"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{user.name}</span>
              </a>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => logout()}
                className="h-9 px-4 gap-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card rounded-full"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <a 
                href="#ecosystem" 
                className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Ecosystem
              </a>
              <a href="/login">
                <Button 
                  size="sm" 
                  className="h-9 px-4 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full"
                >
                  Sign In
                </Button>
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
