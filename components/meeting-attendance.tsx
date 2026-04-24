"use client";

import { useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.godevelopers.online";

// Send attendance ping every 2 minutes
const ATTENDANCE_INTERVAL = 2 * 60 * 1000;

interface MeetingAttendanceProps {
  roomName: string;
}

export function MeetingAttendance({ roomName }: MeetingAttendanceProps) {
  const { getAccessToken, user } = useAuth();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date>(new Date());

  const recordAttendance = useCallback(async () => {
    const accessToken = getAccessToken();
    if (!accessToken || !user) return;

    try {
      await fetch(`${API_BASE_URL}/meetings/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          roomName,
          userId: user.id,
          timestamp: new Date().toISOString(),
          duration: Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000),
        }),
      });
    } catch (error) {
      console.error("[v0] Failed to record attendance:", error);
    }
  }, [getAccessToken, user, roomName]);

  useEffect(() => {
    // Record initial attendance
    recordAttendance();

    // Set up interval for periodic attendance updates
    intervalRef.current = setInterval(recordAttendance, ATTENDANCE_INTERVAL);

    // Clean up on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Record final attendance on leave
      recordAttendance();
    };
  }, [recordAttendance]);

  // This component doesn't render anything visible
  return null;
}
