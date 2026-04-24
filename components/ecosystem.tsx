import { ArrowUpRight } from "lucide-react";

const platforms = [
  {
    name: "DSA Hub",
    description: "Data structures and algorithms",
    href: "https://hustler.godevelopers.online",
  },
  {
    name: "Roadmaps",
    description: "Guided learning paths",
    href: "https://roadmaps.godevelopers.online",
  },
  {
    name: "Practice",
    description: "Hands-on challenges",
    href: "https://practice.godevelopers.online",
  },
  {
    name: "Leaderboard",
    description: "Track your progress",
    href: "https://leaderboard.godevelopers.online",
  },
];

export function Ecosystem() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header - minimal */}
        <div className="text-center mb-20">
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">
            Ecosystem
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
            Everything you need to grow
          </h2>
        </div>

        {/* Platform grid - clean and spacious */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {platform.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {platform.description}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
