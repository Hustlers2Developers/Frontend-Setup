"use client";

import { ArrowUpRight, BookOpen, Trophy, Target, BarChart3 } from "lucide-react";

const platforms = [
  {
    name: "DSA Hub",
    description: "Master data structures and algorithms with structured courses, practice problems, and real interview preparation.",
    href: "https://hustler.godevelopers.online",
    icon: BookOpen,
    gradient: "from-primary/20 to-primary/5",
    borderGlow: "hover:shadow-primary/20",
  },
  {
    name: "Roadmaps",
    description: "Follow curated learning paths designed by senior engineers. From frontend to system design, we have got you covered.",
    href: "https://roadmaps.godevelopers.online",
    icon: Target,
    gradient: "from-accent/20 to-accent/5",
    borderGlow: "hover:shadow-accent/20",
  },
  {
    name: "Practice",
    description: "Hands-on challenges that simulate real-world scenarios. Build projects, solve problems, get better every day.",
    href: "https://practice.godevelopers.online",
    icon: Trophy,
    gradient: "from-primary/20 to-accent/5",
    borderGlow: "hover:shadow-primary/20",
  },
  {
    name: "Leaderboard",
    description: "Track your progress against the community. Compete, collaborate, and celebrate wins with fellow developers.",
    href: "https://leaderboard.godevelopers.online",
    icon: BarChart3,
    gradient: "from-accent/20 to-primary/5",
    borderGlow: "hover:shadow-accent/20",
  },
];

export function Ecosystem() {
  return (
    <section className="relative py-32 px-6 overflow-hidden" id="ecosystem">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary border border-border text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Ecosystem
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Everything you need <br className="hidden sm:block" />
            <span className="text-gradient">to grow</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-balance">
            A complete suite of tools designed to take you from curious beginner to confident engineer.
          </p>
        </div>

        {/* Platform grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platforms.map((platform, index) => (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-2xl bg-card border border-border p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl ${platform.borderGlow}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                    <platform.icon className="w-7 h-7 text-primary" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {platform.name}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {platform.description}
                </p>

                {/* Decorative line */}
                <div className="mt-6 h-px w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Ready to level up?{" "}
            <a 
              href="/login" 
              className="text-primary hover:text-accent transition-colors duration-300 font-medium inline-flex items-center gap-1 group"
            >
              Join the community
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
