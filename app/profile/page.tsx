"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Settings, 
  Shield, 
  Flame, 
  Trophy, 
  Calendar, 
  Github,
  Twitter,
  Linkedin,
  Globe,
  Camera,
  Loader2,
  CheckCircle,
  Bell,
  Moon,
  LogOut
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || "Developer");
  const [bio, setBio] = useState("Building the future, one commit at a time.");
  const [website, setWebsite] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const email = user?.email || "developer@h2d.community";
  const role = "Core Contributor";
  
  const stats = {
    streak: 7,
    longestStreak: 21,
    totalDays: 47,
    rank: 156,
  };

  const achievements = [
    { name: "First Commit", description: "Made your first contribution", earned: true },
    { name: "Week Warrior", description: "7-day streak achieved", earned: true },
    { name: "Month Master", description: "30-day streak achieved", earned: false },
    { name: "Top 100", description: "Reach top 100 on leaderboard", earned: false },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-[72px]">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          {/* Profile Header */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <div className="relative group">
                <Avatar className="w-24 h-24 ring-4 ring-border shadow-xl">
                  <AvatarImage src={`https://avatar.vercel.sh/${email}`} alt={name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold">
                    {name.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-foreground" />
                </button>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-foreground">{name}</h1>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {role}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{email}</p>
                
                {/* Quick stats */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{stats.streak}</span> day streak
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">
                      Rank <span className="font-semibold text-foreground">#{stats.rank}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{stats.totalDays}</span> total days
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Link href="/streak">
                  <Button variant="outline" className="border-border hover:bg-secondary">
                    <Flame className="w-4 h-4 mr-2" />
                    View Streak
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="bg-card border border-border p-1">
              <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="achievements" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Trophy className="w-4 h-4" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main form */}
                <Card className="lg:col-span-2 p-8 bg-card border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-6">Personal Information</h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Full Name</label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="h-11 bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Email</label>
                        <Input
                          value={email}
                          disabled
                          className="h-11 bg-muted border-border cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Bio</label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-4">Social Links</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Website
                          </label>
                          <Input
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="https://yoursite.com"
                            className="h-10 bg-background border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground flex items-center gap-2">
                            <Github className="w-4 h-4" />
                            GitHub
                          </label>
                          <Input
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            placeholder="username"
                            className="h-10 bg-background border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground flex items-center gap-2">
                            <Twitter className="w-4 h-4" />
                            Twitter
                          </label>
                          <Input
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            placeholder="@username"
                            className="h-10 bg-background border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground flex items-center gap-2">
                            <Linkedin className="w-4 h-4" />
                            LinkedIn
                          </label>
                          <Input
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            placeholder="username"
                            className="h-10 bg-background border-border"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      <Button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : saveSuccess ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Saved
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Stats card */}
                  <Card className="p-6 bg-card border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Your Progress</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Monthly Goal</span>
                          <span className="text-sm font-semibold text-foreground">85%</span>
                        </div>
                        <Progress value={85} className="h-2 [&>[role=progressbar]]:bg-gradient-to-r [&>[role=progressbar]]:from-primary [&>[role=progressbar]]:to-accent" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Best Streak</span>
                          <span className="text-sm font-semibold text-foreground">{stats.longestStreak} days</span>
                        </div>
                        <Progress value={(stats.streak / stats.longestStreak) * 100} className="h-2 [&>[role=progressbar]]:bg-primary" />
                      </div>
                    </div>
                  </Card>

                  {/* Quick links */}
                  <Card className="p-6 bg-card border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <Link href="/streak" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                        <Flame className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">View Streak Dashboard</span>
                      </Link>
                      <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                        <Trophy className="w-4 h-4 text-accent" />
                        <span className="text-sm text-foreground">Check Leaderboard</span>
                      </Link>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <Card className="p-8 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">Your Achievements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.name}
                      className={`p-5 rounded-xl border transition-all ${
                        achievement.earned
                          ? "bg-primary/5 border-primary/20"
                          : "bg-muted/50 border-border opacity-60"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          achievement.earned ? "bg-primary/20" : "bg-muted"
                        }`}>
                          <Trophy className={`w-6 h-6 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{achievement.name}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="p-8 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">Preferences</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-4">
                      <Bell className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive streak reminders</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-border">
                      Enabled
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-4">
                      <Moon className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">Always enabled</p>
                      </div>
                    </div>
                    <Badge variant="secondary">System</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-4">
                      <Shield className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Two-Factor Auth</p>
                        <p className="text-sm text-muted-foreground">Add extra security</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-border">
                      Setup
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Danger zone */}
              <Card className="p-8 bg-card border-destructive/20">
                <h3 className="text-lg font-semibold text-destructive mb-6">Danger Zone</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Sign out from all devices</p>
                    <p className="text-sm text-muted-foreground">This will log you out everywhere</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-destructive/50 text-destructive hover:bg-destructive/10"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
