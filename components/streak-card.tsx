"use client";

import { useState } from "react";
import { Flame, Snowflake, Zap, Trophy, Calendar, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function StreakCard() {
  const [streak, setStreak] = useState(7);
  const [freezeTokens] = useState(2);
  const [markedToday, setMarkedToday] = useState(false);
  
  const longestStreak = 21;
  const totalDays = 47;
  const monthlyProgress = 85;
  const weeklyGoal = 5;
  const weeklyCompleted = 4;

  const handleMarkActivity = () => {
    if (!markedToday) {
      setStreak((prev) => prev + 1);
      setMarkedToday(true);
    }
  };

  const stats = [
    {
      icon: Trophy,
      value: longestStreak,
      label: "Best Streak",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Calendar,
      value: totalDays,
      label: "Total Days",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: TrendingUp,
      value: `${monthlyProgress}%`,
      label: "This Month",
      color: "text-foreground",
      bgColor: "bg-secondary",
    },
  ];

  return (
    <div className="w-full max-w-[580px] mx-auto space-y-6">
      {/* Main Streak Card */}
      <Card className="relative overflow-hidden p-8 bg-card border-border">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        {/* Decorative ring */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10">
          {/* Streak display */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                  <Flame className="w-8 h-8 text-primary-foreground" />
                </div>
                {markedToday && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="text-left">
                <span className="text-6xl sm:text-7xl font-bold text-foreground leading-none">
                  {streak}
                </span>
                <p className="text-muted-foreground font-medium mt-1">day streak</p>
              </div>
            </div>
          </div>

          {/* Weekly progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">Weekly Goal</span>
              <span className="text-sm font-semibold text-foreground">{weeklyCompleted}/{weeklyGoal} days</span>
            </div>
            <Progress 
              value={(weeklyCompleted / weeklyGoal) * 100} 
              className="h-2 bg-secondary [&>[role=progressbar]]:bg-gradient-to-r [&>[role=progressbar]]:from-primary [&>[role=progressbar]]:to-accent"
            />
          </div>

          {/* Freeze tokens & Mark button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
              <Snowflake className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{freezeTokens}</span> freeze tokens
              </span>
            </div>
            
            <Button
              onClick={handleMarkActivity}
              disabled={markedToday}
              className={`h-12 px-8 font-semibold rounded-full transition-all duration-300 gap-2 ${
                markedToday 
                  ? "bg-green-500/20 text-green-500 border border-green-500/30 hover:bg-green-500/20" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40"
              }`}
            >
              {markedToday ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Done for Today
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Mark Activity
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card 
            key={stat.label} 
            className="relative overflow-hidden p-5 bg-card border-border hover:border-primary/30 transition-all duration-300 group"
          >
            {/* Hover effect */}
            <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {stat.label}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
