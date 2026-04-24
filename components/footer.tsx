import { Github, MessageSquare, Twitter } from "lucide-react";

const links = [
  { name: "GitHub", href: "https://github.com/AtharvPorate1", icon: Github },
  { name: "Slack", href: "#", icon: MessageSquare },
  { name: "Twitter", href: "#", icon: Twitter },
];

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <a href="/" className="text-xl font-bold tracking-tight text-foreground">
            H2D
          </a>

          {/* Social links */}
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Free and open source. Built by the community.
          </p>
        </div>
      </div>
    </footer>
  );
}
