"use client";

import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { StreakCard } from "@/components/streak-card";

export function Hero() {
  const { user, isLoading } = useAuth();

  // Loading state
  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  // Logged in - show streak dashboard
  if (user) {
    return (
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-[72px]">
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          {/* Welcome message */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
              Welcome back, {user.name}
            </h1>
            <p className="text-muted-foreground">
              Keep the momentum going. Build something today.
            </p>
          </div>

          {/* Streak Card */}
          <StreakCard />
        </div>
      </section>
    );
  }

  // Logged out - show landing
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      {/* Minimal ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Minimal badge */}
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-12">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Open Source Developer Community
        </div>

        {/* Core message - ultra clean */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.1] mb-8">
          <span className="text-foreground">Turn Curiosity</span>
          <br />
          <span className="text-foreground">into </span>
          <span className="text-primary">Expertise</span>
        </h1>

        {/* Single line description */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-12 text-balance">
          Build production-grade systems. Share knowledge openly. Grow together.
        </p>

        {/* Single primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="h-14 px-8 text-base font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full gap-3 group"
          >
            <Github className="w-5 h-5" />
            Start Building
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button 
            size="lg" 
            variant="ghost"
            className="h-14 px-8 text-base font-medium text-muted-foreground hover:text-foreground rounded-full"
          >
            Explore Ecosystem
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
      </div>
    </section>
  );
}
