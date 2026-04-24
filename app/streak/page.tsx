"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Flame, 
  Snowflake, 
  Trophy, 
  Calendar, 
  Zap, 
  TrendingUp, 
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Target,
  Award,
  Users
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

// Generate calendar data for the current month
const generateCalendarData = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const activeDays = new Set([1, 2, 3, 5, 6, 7, 8, 10, 12, 13, 14, 15, 17, 18, 19, 21, 22, 23, 24]);
  
  return { year, month, daysInMonth, firstDayOfMonth, activeDays, today: today.getDate() };
};

export default function StreakPage() {
  const { user } = useAuth();
  const [currentStreak, setCurrentStreak] = useState(12);
  const [freezeTokens, setFreezeTokens] = useState(3);
  const [todayMarked, setTodayMarked] = useState(false);

  const longestStreak = 28;
  const totalActiveDays = 47;
  const monthlyGoal = 22;
  const monthlyProgress = 19;
  const rank = 156;
  const calendar = generateCalendarData();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleMarkToday = () => {
    if (!todayMarked) {
      setCurrentStreak(prev => prev + 1);
      setTodayMarked(true);
    }
  };

  const useFreeze = () => {
    if (freezeTokens > 0) {
      setFreezeTokens(prev => prev - 1);
    }
  };

  const statCards = [
    {
      icon: Trophy,
      label: "Best Streak",
      value: longestStreak,
      suffix: "days",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Calendar,
      label: "Total Active Days",
      value: totalActiveDays,
      suffix: "days",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: TrendingUp,
      label: "This Month",
      value: monthlyProgress,
      suffix: `/ ${monthlyGoal}`,
      color: "text-foreground",
      bgColor: "bg-secondary",
    },
    {
      icon: Users,
      label: "Global Rank",
      value: `#${rank}`,
      suffix: "",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-[72px]">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
              <Flame className="w-3 h-3 mr-1" />
              Streak Dashboard
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Your Activity Streak
            </h1>
            <p className="text-muted-foreground">
              Stay consistent, build habits, achieve greatness
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Main streak card */}
            <div className="lg:col-span-2 space-y-6">
              {/* Primary streak card */}
              <Card className="relative overflow-hidden p-8 bg-card border-border">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    {/* Streak display */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/30">
                          <Flame className="w-12 h-12 text-primary-foreground" />
                        </div>
                        {todayMarked && (
                          <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-7xl sm:text-8xl font-bold text-foreground leading-none">
                          {currentStreak}
                        </span>
                        <p className="text-muted-foreground font-medium mt-2">day streak</p>
                      </div>
                    </div>

                    {/* Action area */}
                    <div className="flex-1 flex flex-col items-center sm:items-end gap-4">
                      <Button
                        onClick={handleMarkToday}
                        disabled={todayMarked}
                        size="lg"
                        className={`h-14 px-8 font-semibold rounded-xl transition-all duration-300 gap-2 ${
                          todayMarked 
                            ? "bg-green-500/20 text-green-500 border border-green-500/30 hover:bg-green-500/20" 
                            : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/25 hover:shadow-primary/40"
                        }`}
                      >
                        {todayMarked ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Done for Today
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            Mark Today&apos;s Activity
                          </>
                        )}
                      </Button>

                      {/* Freeze tokens */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
                          <Snowflake className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">{freezeTokens}</span> freeze tokens
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={useFreeze}
                          disabled={freezeTokens === 0}
                          className="border-border hover:bg-secondary"
                        >
                          Use
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Monthly progress */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Monthly Goal</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">{monthlyProgress}</span> / {monthlyGoal} days
                      </span>
                    </div>
                    <Progress 
                      value={(monthlyProgress / monthlyGoal) * 100} 
                      className="h-3 bg-secondary [&>[role=progressbar]]:bg-gradient-to-r [&>[role=progressbar]]:from-primary [&>[role=progressbar]]:to-accent"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {monthlyGoal - monthlyProgress} more days to reach your goal
                    </p>
                  </div>
                </div>
              </Card>

              {/* Calendar */}
              <Card className="p-4 sm:p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    {monthNames[calendar.month]} {calendar.year}
                  </h3>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Calendar container with max width for consistent sizing */}
                <div className="max-w-[320px] mx-auto">
                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map(day => (
                      <div key={day} className="text-center text-[10px] sm:text-xs font-medium text-muted-foreground py-1 sm:py-2">
                        {day.slice(0, 2)}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid - fixed size cells */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: calendar.firstDayOfMonth }).map((_, i) => (
                      <div key={`empty-${i}`} className="w-10 h-10 sm:w-10 sm:h-10" />
                    ))}
                    
                    {/* Days of the month */}
                    {Array.from({ length: calendar.daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const isActive = calendar.activeDays.has(day);
                      const isToday = day === calendar.today;
                      const isPast = day < calendar.today;
                      
                      return (
                        <div
                          key={day}
                          className={`w-10 h-10 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            isToday 
                              ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-1 ring-offset-background" 
                              : isActive 
                                ? "bg-primary/20 text-primary hover:bg-primary/30"
                                : isPast 
                                  ? "text-muted-foreground/50 hover:bg-secondary/50"
                                  : "text-muted-foreground hover:bg-secondary"
                          }`}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-primary/20" />
                    <span className="text-[10px] sm:text-xs text-muted-foreground">Active</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-primary" />
                    <span className="text-[10px] sm:text-xs text-muted-foreground">Today</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-muted" />
                    <span className="text-[10px] sm:text-xs text-muted-foreground">Missed</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right column - Stats */}
            <div className="space-y-6">
              {/* Stats grid */}
              {statCards.map((stat) => (
                <Card 
                  key={stat.label}
                  className="p-6 bg-card border-border hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                        {stat.suffix && <span className="text-base font-normal text-muted-foreground ml-1">{stat.suffix}</span>}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Achievements preview */}
              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Recent Achievements</h3>
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Flame className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Week Warrior</p>
                      <p className="text-xs text-muted-foreground">7-day streak</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Speed Demon</p>
                      <p className="text-xs text-muted-foreground">10 activities in a week</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tips */}
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
                <h3 className="font-semibold text-foreground mb-2">Pro Tip</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Keep your streak alive even on busy days. Just 5 minutes of coding counts as activity.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
