"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import JitsiMeetEmbed from "@/components/jitsi-meet-embed";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ room: string }>;
}

export default function MeetingPage({ params }: PageProps) {
  const { room } = use(params);
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.replace(`/login?redirect=/meeting/${room}`);
      } else {
        setIsReady(true);
      }
    }
  }, [user, isLoading, router, room]);

  const handleMeetingEnd = () => {
    router.push("/dashboard");
  };

  if (isLoading || !isReady) {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return <JitsiMeetEmbed room={room} onMeetingEnd={handleMeetingEnd} />;
}
