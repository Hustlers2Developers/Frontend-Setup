"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";
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

      // Store tokens
      localStorage.setItem("accessToken", response.acceptInvite.accessToken);
      localStorage.setItem("refreshToken", response.acceptInvite.refreshToken);

      // Redirect to home
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
      <Card className="w-full max-w-[400px] p-8 bg-card border-border text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-xl font-semibold text-foreground mb-2">
          Invalid Invite Link
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          This invite link is invalid or has expired. Please check your email for the correct link or contact your admin.
        </p>
        <a href="/login">
          <Button className="w-full h-12 bg-foreground text-background hover:bg-foreground/90">
            Go to Login
          </Button>
        </a>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-[400px] p-8 bg-card border-border">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <a href="/" className="text-2xl font-bold tracking-tight text-foreground">
          H2D
        </a>
        <p className="text-sm text-muted-foreground mt-2">
          You&apos;ve been invited to join
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="h-12 bg-background border-border"
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
            className="h-12 bg-background border-border disabled:opacity-60"
          />
          {inviteEmail && (
            <p className="text-xs text-muted-foreground">
              Email is pre-filled from your invite
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Create Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 8 characters"
            required
            minLength={8}
            className="h-12 bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
            minLength={8}
            className="h-12 bg-background border-border"
          />
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-medium gap-2"
        >
          {isLoading ? "Creating account..." : "Accept Invite & Join"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-primary hover:underline font-medium">
          Sign in
        </a>
      </p>
    </Card>
  );
}

export default function InvitePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background">
      <Suspense fallback={
        <Card className="w-full max-w-[400px] p-8 bg-card border-border text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4" />
            <div className="h-6 bg-muted rounded w-24 mx-auto mb-2" />
            <div className="h-4 bg-muted rounded w-48 mx-auto" />
          </div>
        </Card>
      }>
        <InviteForm />
      </Suspense>
    </main>
  );
}
