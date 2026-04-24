"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Flame, 
  Trophy, 
  Target, 
  ArrowUpRight, 
  TrendingUp, 
  BookOpen,
  Code2,
  Users,
  Zap,
  ChevronRight,
  Clock,
  CheckCircle2,
  Star,
  Video,
  LogIn,
  MessageSquare
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

// Sample data for leaderboard
const leaderboardData = [
  { rank: 1, name: "Sarah Chen", streak: 45, avatar: "sarah", change: "up" },
  { rank: 2, name: "Alex Kumar", streak: 38, avatar: "alex", change: "same" },
  { rank: 3, name: "Mike Johnson", streak: 35, avatar: "mike", change: "up" },
  { rank: 4, name: "Emily Davis", streak: 32, avatar: "emily", change: "down" },
  { rank: 5, name: "Chris Lee", streak: 28, avatar: "chris", change: "up" },
];

// Sample data for recent activity
const recentActivity = [
  { type: "streak", message: "Extended streak to 12 days", time: "2 hours ago" },
  { type: "achievement", message: "Earned 'Week Warrior' badge", time: "Yesterday" },
  { type: "practice", message: "Completed Array problems set", time: "2 days ago" },
  { type: "roadmap", message: "Started 'System Design' path", time: "3 days ago" },
];

// Quick links to ecosystem
const quickLinks = [
  { 
    name: "DSA Hub", 
    description: "Practice algorithms", 
    icon: Code2, 
    href: "https://hustler.godevelopers.online",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  { 
    name: "Roadmaps", 
    description: "Learning paths", 
    icon: Target, 
    href: "https://roadmaps.godevelopers.online",
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  { 
    name: "Practice", 
    description: "Build projects", 
    icon: BookOpen, 
    href: "https://practice.godevelopers.online",
    color: "text-foreground",
    bgColor: "bg-secondary"
  },
  { 
    name: "Leaderboard", 
    description: "See rankings", 
    icon: Trophy, 
    href: "https://leaderboard.godevelopers.online",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  { 
    name: "Community", 
    description: "Join Slack", 
    icon: MessageSquare, 
    href: "https://join.slack.com/t/teamhustlersworld/shared_invite/zt-3lihulkj7-2gCwffDBf5tGc1Zpus_NZw",
    color: "text-[#4A154B]",
    bgColor: "bg-[#4A154B]/10"
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStreak] = useState(12);
  const [meetingRoom, setMeetingRoom] = useState("");
  const longestStreak = 28;
  const totalDays = 47;
  const rank = 156;
  const weeklyGoal = 5;
  const weeklyCompleted = 4;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-[72px]">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.name?.split(' ')[0] || 'Developer'}. Here&apos;s your overview.
              </p>
            </div>
            <Link href="/streak">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2">
                <Flame className="w-4 h-4" />
                View Streak
              </Button>
            </Link>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <Card className="p-6 bg-card border-border hover:border-primary/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Flame className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-bold text-foreground">{currentStreak} <span className="text-base font-normal text-muted-foreground">days</span></p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-primary/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Best Streak</p>
                  <p className="text-2xl font-bold text-foreground">{longestStreak} <span className="text-base font-normal text-muted-foreground">days</span></p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-primary/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Days</p>
                  <p className="text-2xl font-bold text-foreground">{totalDays} <span className="text-base font-normal text-muted-foreground">active</span></p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-primary/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Global Rank</p>
                  <p className="text-2xl font-bold text-foreground">#{rank}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Weekly progress */}
              <Card className="p-8 bg-card border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Weekly Progress</h2>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {weeklyCompleted}/{weeklyGoal} days
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  {[...Array(7)].map((_, i) => {
                    const isCompleted = i < weeklyCompleted;
                    const isToday = i === weeklyCompleted;
                    return (
                      <div 
                        key={i} 
                        className={`flex-1 h-16 rounded-xl flex items-center justify-center transition-all ${
                          isCompleted 
                            ? "bg-gradient-to-br from-primary to-accent" 
                            : isToday 
                              ? "bg-secondary border-2 border-dashed border-primary"
                              : "bg-secondary"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                        ) : isToday ? (
                          <Zap className="w-5 h-5 text-primary" />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
                
                <Progress 
                  value={(weeklyCompleted / weeklyGoal) * 100} 
                  className="h-2 bg-secondary [&>[role=progressbar]]:bg-gradient-to-r [&>[role=progressbar]]:from-primary [&>[role=progressbar]]:to-accent"
                />
                <p className="text-sm text-muted-foreground mt-3">
                  {weeklyGoal - weeklyCompleted} more day{weeklyGoal - weeklyCompleted !== 1 ? 's' : ''} to complete your weekly goal
                </p>
              </Card>

              {/* Quick Links */}
              <Card className="p-8 bg-card border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Quick Access</h2>
                  <a href="/#ecosystem" className="text-sm text-primary hover:text-accent transition-colors">
                    View all
                  </a>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {quickLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 hover:bg-secondary transition-all"
                    >
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${link.bgColor} flex items-center justify-center shrink-0`}>
                        <link.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${link.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                          {link.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {link.description}
                        </p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                    </a>
                  ))}
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-8 bg-card border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activity.type === 'streak' ? 'bg-primary/10' :
                        activity.type === 'achievement' ? 'bg-accent/10' : 'bg-secondary'
                      }`}>
                        {activity.type === 'streak' && <Flame className="w-4 h-4 text-primary" />}
                        {activity.type === 'achievement' && <Trophy className="w-4 h-4 text-accent" />}
                        {activity.type === 'practice' && <Code2 className="w-4 h-4 text-foreground" />}
                        {activity.type === 'roadmap' && <Target className="w-4 h-4 text-foreground" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right column - Leaderboard & more */}
            <div className="space-y-8">
              {/* Leaderboard */}
              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Top Streakers</h2>
                  <a 
                    href="https://leaderboard.godevelopers.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-accent transition-colors flex items-center gap-1"
                  >
                    View all
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
                
                <div className="space-y-3">
                  {leaderboardData.map((person) => (
                    <div 
                      key={person.rank}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        person.rank <= 3 ? 'bg-primary/5 border border-primary/10' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <span className={`w-6 text-center font-bold ${
                        person.rank === 1 ? 'text-primary' : 
                        person.rank === 2 ? 'text-accent' : 
                        person.rank === 3 ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {person.rank}
                      </span>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={`https://avatar.vercel.sh/${person.avatar}`} />
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {person.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{person.name}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-primary" />
                        <span className="text-sm font-semibold text-foreground">{person.streak}</span>
                      </div>
                      <TrendingUp className={`w-3 h-3 ${
                        person.change === 'up' ? 'text-green-500' : 
                        person.change === 'down' ? 'text-destructive rotate-180' : 'text-muted-foreground'
                      }`} />
                    </div>
                  ))}
                </div>

                {/* Your position */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                    <span className="w-6 text-center font-bold text-muted-foreground">{rank}</span>
                    <Avatar className="w-8 h-8 ring-2 ring-primary">
                      <AvatarImage src={`https://avatar.vercel.sh/${user?.email || 'dev'}`} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {user?.name?.[0] || 'D'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">You</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-primary" />
                      <span className="text-sm font-semibold text-foreground">{currentStreak}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Join Meeting Card */}
              <Card className="p-6 bg-card border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Video className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Join Meeting</h3>
                    <p className="text-xs text-muted-foreground">Enter room name to join</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Room name..."
                    value={meetingRoom}
                    onChange={(e) => setMeetingRoom(e.target.value)}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && meetingRoom.trim()) {
                        router.push(`/meeting/${encodeURIComponent(meetingRoom.trim())}`);
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (meetingRoom.trim()) {
                        router.push(`/meeting/${encodeURIComponent(meetingRoom.trim())}`);
                      }
                    }}
                    disabled={!meetingRoom.trim()}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Join
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-3 border-border hover:bg-secondary gap-2"
                  onClick={() => router.push("/meeting/hustler-space")}
                >
                  <Users className="w-4 h-4" />
                  Join Hustler Space
                </Button>
              </Card>

              {/* Motivation card */}
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
                <div className="flex items-start gap-3 mb-4">
                  <Star className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Daily Motivation</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      &quot;The only way to do great work is to love what you do.&quot;
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">- Steve Jobs</p>
                  </div>
                </div>
              </Card>

              {/* Challenge */}
              <Card className="p-6 bg-card border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Weekly Challenge</h3>
                    <p className="text-xs text-muted-foreground">Ends in 3 days</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete 7 consecutive days of activity to earn the &quot;Unstoppable&quot; badge.
                </p>
                <Progress value={57} className="h-2 [&>[role=progressbar]]:bg-accent" />
                <p className="text-xs text-muted-foreground mt-2">4/7 days completed</p>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
