"use client";

import Link from "next/link";
import { ArrowRight, Github, Sparkles, Users, Code2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { StreakCard } from "@/components/streak-card";

const stats = [
  { label: "Active Developers", value: "2,500+", icon: Users },
  { label: "Projects Built", value: "150+", icon: Code2 },
  { label: "Learning Paths", value: "20+", icon: Sparkles },
];

export function Hero() {
  const { user, isLoading } = useAuth();

  // Loading state
  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-r-accent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
      </section>
    );
  }

  // Logged in - show personalized dashboard
  if (user) {
    return (
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-[72px] pb-20">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto">
          {/* Welcome header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Welcome back
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
              Hey, <span className="text-gradient">{user.name.split(' ')[0]}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto text-balance">
              Keep building, keep learning. Your streak is on fire today.
            </p>
          </div>

          {/* Streak Card */}
          <StreakCard />

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            <Link href="/streak">
              <Button 
                size="lg"
                className="h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 gap-2"
              >
                View Full Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/profile">
              <Button 
                size="lg"
                variant="outline"
                className="h-12 px-6 border-border hover:bg-secondary rounded-full transition-all duration-300"
              >
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Logged out - show premium landing
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-[120px] animate-float" />
        
        {/* Secondary orbs */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-accent/10 rounded-full blur-[60px] animate-float" style={{ animationDelay: '-4s' }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Radial fade at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center pt-20">
        {/* Premium badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border/50 text-sm font-medium text-muted-foreground mb-10 hover:border-primary/30 transition-colors duration-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Open Source Developer Community
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8">
          <span className="text-foreground">Turn </span>
          <span className="text-gradient">Curiosity</span>
          <br />
          <span className="text-foreground">into </span>
          <span className="text-gradient">Expertise</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed text-balance">
          Build production-grade systems. Learn from real engineers. 
          Join a community that transforms hustlers into developers.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link href="/login">
            <Button 
              size="lg" 
              className="h-14 px-8 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 gap-3 group"
            >
              <Github className="w-5 h-5" />
              Start Building
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
          <a href="#ecosystem">
            <Button 
              size="lg" 
              variant="outline"
              className="h-14 px-8 text-base font-medium border-border hover:bg-secondary hover:border-border rounded-full transition-all duration-300"
            >
              Explore Ecosystem
            </Button>
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="flex items-center justify-center gap-2 mb-2">
                <stat.icon className="w-5 h-5 text-primary" />
                <span className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/50 font-medium">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-muted-foreground/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
}
