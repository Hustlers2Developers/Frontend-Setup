"use client";

import Link from "next/link";
import { Github, MessageSquare, Twitter, Zap, Heart } from "lucide-react";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/AtharvPorate1", icon: Github },
  { name: "Slack", href: "#", icon: MessageSquare },
  { name: "Twitter", href: "#", icon: Twitter },
];

const footerLinks = [
  {
    title: "Platform",
    links: [
      { name: "DSA Hub", href: "https://hustler.godevelopers.online" },
      { name: "Roadmaps", href: "https://roadmaps.godevelopers.online" },
      { name: "Practice", href: "https://practice.godevelopers.online" },
      { name: "Leaderboard", href: "https://leaderboard.godevelopers.online" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Discord", href: "#" },
      { name: "Slack", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "GitHub", href: "https://github.com/AtharvPorate1" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Changelog", href: "#" },
      { name: "Support", href: "#" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card/50">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                H2D
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Transforming curious minds into confident developers through real-world projects and community-driven learning.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-1">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300"
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {currentYear} Hustlers2Developers. Open source and free forever.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Built with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> by the community
          </p>
        </div>
      </div>
    </footer>
  );
}
