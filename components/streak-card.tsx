"use client";

import { useState } from "react";
import { Flame, Snowflake, Zap, Trophy, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function StreakCard() {
  const [streak, setStreak] = useState(7);
  const [freezeTokens] = useState(2);
  const [markedToday, setMarkedToday] = useState(false);

  const handleMarkActivity = () => {
    if (!markedToday) {
      setStreak((prev) => prev + 1);
      setMarkedToday(true);
    }
  };

  return (
    <div className="w-full max-w-[500px] mx-auto space-y-6">
      {/* Main Streak Card */}
      <Card className="p-8 text-center bg-card border-border">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Flame className="w-10 h-10 text-accent" />
          <span className="text-[72px] font-bold leading-none text-foreground">
            {streak}
          </span>
        </div>
        <p className="text-muted-foreground mb-6">Current Streak</p>

        {/* Freeze Tokens */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Snowflake className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            {freezeTokens} freeze tokens available
          </span>
        </div>

        {/* Mark Activity Button */}
        <Button
          onClick={handleMarkActivity}
          disabled={markedToday}
          className="w-[200px] h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          {markedToday ? "Done for Today" : "Mark Today's Activity"}
        </Button>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="h-[120px] p-4 flex flex-col items-center justify-center bg-card border-border">
          <Trophy className="w-6 h-6 text-primary mb-2" />
          <span className="text-2xl font-bold text-foreground">21</span>
          <span className="text-xs text-muted-foreground text-center">
            Longest Streak
          </span>
        </Card>

        <Card className="h-[120px] p-4 flex flex-col items-center justify-center bg-card border-border">
          <Zap className="w-6 h-6 text-accent mb-2" />
          <span className="text-2xl font-bold text-foreground">47</span>
          <span className="text-xs text-muted-foreground text-center">
            Total Days
          </span>
        </Card>

        <Card className="h-[120px] p-4 flex flex-col items-center justify-center bg-card border-border">
          <Calendar className="w-6 h-6 text-primary mb-2" />
          <span className="text-2xl font-bold text-foreground">85%</span>
          <span className="text-xs text-muted-foreground text-center">
            This Month
          </span>
        </Card>
      </div>
    </div>
  );
}
