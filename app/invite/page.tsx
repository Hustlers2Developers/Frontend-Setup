"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Zap, Mail, CheckCircle2, Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { graphqlRequest, ACCEPT_INVITE_MUTATION } from "@/lib/graphql-client";

interface AcceptInviteResponse {
  acceptInvite: {
    accessToken: string;
    refreshToken: string;
  };
}

function InviteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const inviteEmail = searchParams.get("email");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState(inviteEmail || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inviteEmail) {
      setEmail(inviteEmail);
    }
  }, [inviteEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid invite link. Please check your email for the correct link.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await graphqlRequest<AcceptInviteResponse>(
        ACCEPT_INVITE_MUTATION,
        { token, email, password, name }
      );

      localStorage.setItem("accessToken", response.acceptInvite.accessToken);
      localStorage.setItem("refreshToken", response.acceptInvite.refreshToken);

      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to accept invite. The link may be expired.");
    } finally {
      setIsLoading(false);
    }
  };

  // No token - show error state
  if (!token) {
    return (
      <div className="w-full max-w-[420px]">
        <Card className="p-10 bg-card border-border text-center">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">
            Invalid Invite Link
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            This invite link is invalid or has expired. Please check your email for the correct link or contact your admin.
          </p>
          <Link href="/login">
            <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl shadow-lg shadow-primary/20">
              Go to Login
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[420px]">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 mb-12 group">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-foreground">
          H2D
        </span>
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium mb-4">
          <CheckCircle2 className="w-4 h-4" />
          You have been invited
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Join the Community
        </h1>
        <p className="text-muted-foreground">
          Complete your profile to start building with H2D
        </p>
      </div>

      {/* Form */}
      <Card className="p-8 bg-card border-border">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="h-12 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={!!inviteEmail}
              className="h-12 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
            {inviteEmail && (
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Mail className="w-3 h-3" />
                Pre-filled from your invite
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Create Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 8 characters"
                required
                minLength={8}
                className="h-12 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              minLength={8}
              className="h-12 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Accept Invite
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Login link */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:text-accent transition-colors font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="w-full max-w-[420px]">
      <Card className="p-10 bg-card border-border">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative mb-6">
            <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
          <p className="text-muted-foreground">Loading invite...</p>
        </div>
      </Card>
    </div>
  );
}

export default function InvitePage() {
  return (
    <main className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <Suspense fallback={<LoadingState />}>
          <InviteForm />
        </Suspense>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-card/50 border-l border-border relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px]" />
        </div>

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-md text-center px-12">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Welcome to H2D
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You have been personally invited to join our community of developers who are building amazing things together.
          </p>
        </div>
      </div>
    </main>
  );
}
