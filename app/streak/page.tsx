"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Snowflake, Trophy, Calendar, Zap } from "lucide-react";

export default function StreakPage() {
  const [currentStreak, setCurrentStreak] = useState(12);
  const [freezeTokens, setFreezeTokens] = useState(3);
  const [todayMarked, setTodayMarked] = useState(false);

  const longestStreak = 28;
  const totalActiveDays = 45;
  const currentMonth = "April 2026";

  const handleMarkToday = () => {
    if (!todayMarked) {
      setCurrentStreak(prev => prev + 1);
      setTodayMarked(true);
    }
  };

  const stats = [
    {
      label: "Longest Streak",
      value: longestStreak,
      unit: "days",
      icon: Trophy,
      color: "text-primary",
    },
    {
      label: "Total Active Days",
      value: totalActiveDays,
      unit: "days",
      icon: Calendar,
      color: "text-accent",
    },
    {
      label: "This Month",
      value: 18,
      unit: "days",
      icon: Zap,
      color: "text-foreground",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[72px]">
        <div className="max-w-[1280px] mx-auto px-6 py-16">
          {/* Header */}
          <h1 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Activity Streak
          </h1>

          {/* Main streak card - centered */}
          <div className="flex justify-center mb-12">
            <Card className="w-full max-w-[500px] p-8 text-center">
              {/* Streak flame icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Flame className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Large streak number */}
              <div className="mb-2">
                <span className="text-[72px] font-bold leading-none text-foreground">
                  {currentStreak}
                </span>
              </div>

              <p className="text-lg text-muted-foreground mb-6">
                Current Streak
              </p>

              {/* Freeze tokens */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <Snowflake className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">
                  {freezeTokens} freeze tokens available
                </span>
              </div>

              {/* Mark activity button */}
              <Button
                onClick={handleMarkToday}
                disabled={todayMarked}
                className="w-[200px] h-12 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {todayMarked ? "Marked for Today" : "Mark Today's Activity"}
              </Button>

              {todayMarked && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Great job! See you tomorrow.
                </p>
              )}
            </Card>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6 h-[120px] flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.unit}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
