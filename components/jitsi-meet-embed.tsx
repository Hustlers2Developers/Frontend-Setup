"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card } from "@/components/ui/card";
import { MeetingAttendance } from "./meeting-attendance";
import { Button } from "@/components/ui/button";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Loader2,
  Users,
  Shield,
  Wifi,
  WifiOff,
  RefreshCw,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

const JITSI_SUB = process.env.NEXT_PUBLIC_JITSI_SUB || "vpaas-magic-cookie-848fabac26c646c8a1ae89fae59a5faa";

interface JitsiMeetEmbedProps {
  room: string;
  onMeetingEnd?: () => void;
}

type MeetingState = "loading" | "connecting" | "connected" | "ended" | "error";

interface JitsiApi {
  dispose: () => void;
  addEventListener: (event: string, callback: () => void) => void;
  executeCommand: (command: string, ...args: unknown[]) => void;
  getNumberOfParticipants: () => number;
  isAudioMuted: () => Promise<boolean>;
  isVideoMuted: () => Promise<boolean>;
}

export default function JitsiMeetEmbed({ room, onMeetingEnd }: JitsiMeetEmbedProps) {
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<JitsiApi | null>(null);
  
  const [meetingState, setMeetingState] = useState<MeetingState>("loading");
  const [error, setError] = useState<string | null>(null);
  const [participantCount, setParticipantCount] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState<"good" | "poor" | "disconnected">("good");

  // Get token from localStorage (stored during login)
  const getStoredToken = useCallback((): string | null => {
    try {
      const stored = localStorage.getItem("h2d_tokens");
      if (stored) {
        const tokens = JSON.parse(stored);
        console.log("[v0] Found stored tokens");
        return tokens.accessToken || null;
      }
    } catch (err) {
      console.log("[v0] Error reading tokens:", err);
    }
    return null;
  }, []);

  // Initialize Jitsi
  const initializeJitsi = useCallback(async () => {
    if (!room || !containerRef.current) {
      console.log("[v0] Missing room or container", { room, container: !!containerRef.current });
      return;
    }

    setMeetingState("loading");
    setError(null);

    // Get token from localStorage
    const jitsiToken = getStoredToken();
    console.log("[v0] Token retrieved:", jitsiToken ? "Yes (length: " + jitsiToken.length + ")" : "No");
    
    if (!jitsiToken) {
      setError("Please login to join meetings");
      setMeetingState("error");
      return;
    }

    setMeetingState("connecting");

    // Load Jitsi external API script
    const existingScript = document.querySelector('script[src="https://8x8.vc/external_api.js"]');
    
    const initApi = () => {
      console.log("[v0] Initializing Jitsi API");
      
      if (!window.JitsiMeetExternalAPI) {
        console.log("[v0] JitsiMeetExternalAPI not available on window");
        setError("Meeting service failed to load");
        setMeetingState("error");
        return;
      }

      if (!containerRef.current) {
        console.log("[v0] Container ref lost");
        return;
      }

      try {
        const roomName = `${JITSI_SUB}/${room}`;
        console.log("[v0] Creating Jitsi room:", roomName);

        const api = new window.JitsiMeetExternalAPI("8x8.vc", {
          roomName: roomName,
          parentNode: containerRef.current,
          jwt: jitsiToken,
          configOverwrite: {
            prejoinPageEnabled: false,
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            disableDeepLinking: true,
            enableClosePage: false,
            disableInviteFunctions: true,
            hideConferenceSubject: false,
            hideConferenceTimer: false,
            subject: room,
            defaultLanguage: "en",
            toolbarButtons: [
              "camera",
              "chat",
              "desktop",
              "fullscreen",
              "hangup",
              "microphone",
              "participants-pane",
              "raisehand",
              "settings",
              "tileview",
              "toggle-camera",
              "videoquality",
            ],
          },
          interfaceConfigOverwrite: {
            TILE_VIEW_MAX_COLUMNS: 4,
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_BRAND_WATERMARK: false,
            BRAND_WATERMARK_LINK: "",
            SHOW_POWERED_BY: false,
            SHOW_PROMOTIONAL_CLOSE_PAGE: false,
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
            MOBILE_APP_PROMO: false,
            HIDE_INVITE_MORE_HEADER: true,
            TOOLBAR_ALWAYS_VISIBLE: false,
            DEFAULT_BACKGROUND: "#0a0a0a",
            DISABLE_VIDEO_BACKGROUND: false,
            INITIAL_TOOLBAR_TIMEOUT: 5000,
            TOOLBAR_TIMEOUT: 3000,
          },
          userInfo: {
            displayName: user?.name || "Developer",
            email: user?.email || "",
          },
        });

        apiRef.current = api;
        console.log("[v0] Jitsi API created successfully");

        // Event listeners
        api.addEventListener("videoConferenceJoined", () => {
          console.log("[v0] Video conference joined");
          setMeetingState("connected");
          setConnectionQuality("good");
        });

        api.addEventListener("participantJoined", () => {
          setParticipantCount(api.getNumberOfParticipants());
        });

        api.addEventListener("participantLeft", () => {
          setParticipantCount(api.getNumberOfParticipants());
        });

        api.addEventListener("audioMuteStatusChanged", async () => {
          const muted = await api.isAudioMuted();
          setIsAudioMuted(muted);
        });

        api.addEventListener("videoMuteStatusChanged", async () => {
          const muted = await api.isVideoMuted();
          setIsVideoMuted(muted);
        });

        api.addEventListener("readyToClose", () => {
          console.log("[v0] Ready to close");
          setMeetingState("ended");
          onMeetingEnd?.();
        });

        api.addEventListener("videoConferenceLeft", () => {
          console.log("[v0] Video conference left");
          setMeetingState("ended");
          onMeetingEnd?.();
        });

        api.addEventListener("suspendDetected", () => {
          setConnectionQuality("poor");
        });

      } catch (err) {
        console.error("[v0] Failed to initialize Jitsi:", err);
        setError("Failed to start meeting. Please refresh and try again.");
        setMeetingState("error");
      }
    };

    if (existingScript && window.JitsiMeetExternalAPI) {
      console.log("[v0] Jitsi script already loaded, initializing directly");
      initApi();
    } else {
      console.log("[v0] Loading Jitsi script");
      const script = document.createElement("script");
      script.src = "https://8x8.vc/external_api.js";
      script.async = true;
      script.onload = () => {
        console.log("[v0] Jitsi script loaded");
        initApi();
      };
      script.onerror = () => {
        console.log("[v0] Failed to load Jitsi script");
        setError("Failed to load meeting service. Check your connection.");
        setMeetingState("error");
      };
      document.body.appendChild(script);
    }

    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
        apiRef.current = null;
      }
    };
  }, [room, getStoredToken, user, onMeetingEnd]);

  useEffect(() => {
    initializeJitsi();
    
    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
        apiRef.current = null;
      }
    };
  }, [initializeJitsi]);

  // Control functions
  const toggleAudio = () => {
    apiRef.current?.executeCommand("toggleAudio");
  };

  const toggleVideo = () => {
    apiRef.current?.executeCommand("toggleVideo");
  };

  const hangUp = () => {
    apiRef.current?.executeCommand("hangup");
  };

  const retry = () => {
    if (apiRef.current) {
      apiRef.current.dispose();
      apiRef.current = null;
    }
    initializeJitsi();
  };

  // Loading state
  if (meetingState === "loading") {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <Card className="p-8 bg-card border-border text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Preparing Meeting
          </h2>
          <p className="text-muted-foreground">
            Setting up your meeting room...
          </p>
        </Card>
      </div>
    );
  }

  // Connecting state
  if (meetingState === "connecting") {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <Card className="p-8 bg-card border-border text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 relative">
            <Video className="w-8 h-8 text-primary" />
            <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 animate-ping" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Connecting to Meeting
          </h2>
          <p className="text-muted-foreground mb-4">
            Joining <span className="font-medium text-primary">{room}</span>
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Secured with end-to-end encryption</span>
          </div>
        </Card>
      </div>
    );
  }

  // Error state
  if (meetingState === "error") {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <Card className="p-8 bg-card border-border text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Connection Failed
          </h2>
          <p className="text-muted-foreground mb-6">
            {error || "Unable to connect to the meeting. Please try again."}
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
            <Button onClick={retry} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Meeting ended state
  if (meetingState === "ended") {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <Card className="p-8 bg-card border-border text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Meeting Ended
          </h2>
          <p className="text-muted-foreground mb-6">
            Thanks for joining! Hope to see you again soon.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => window.location.href = "/dashboard"}>
              Go to Dashboard
            </Button>
            <Button onClick={retry} className="gap-2">
              <Video className="w-4 h-4" />
              Rejoin Meeting
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Connected state - show meeting
  return (
    <div className="h-screen w-full bg-background flex flex-col">
      {/* Meeting header */}
      <div className="h-14 bg-card border-b border-border flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Video className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">{room}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{participantCount} participant{participantCount !== 1 ? "s" : ""}</span>
              {connectionQuality === "good" ? (
                <Wifi className="w-3 h-3 text-green-500 ml-2" />
              ) : connectionQuality === "poor" ? (
                <Wifi className="w-3 h-3 text-yellow-500 ml-2" />
              ) : (
                <WifiOff className="w-3 h-3 text-destructive ml-2" />
              )}
            </div>
          </div>
        </div>
        
        {/* Quick controls */}
        <div className="flex items-center gap-2">
          <Button
            variant={isAudioMuted ? "destructive" : "secondary"}
            size="icon"
            className="h-9 w-9 rounded-lg"
            onClick={toggleAudio}
          >
            {isAudioMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button
            variant={isVideoMuted ? "destructive" : "secondary"}
            size="icon"
            className="h-9 w-9 rounded-lg"
            onClick={toggleVideo}
          >
            {isVideoMuted ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="h-9 w-9 rounded-lg ml-2"
            onClick={hangUp}
          >
            <PhoneOff className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Jitsi container */}
      <div 
        ref={containerRef}
        className="flex-1 bg-[#0a0a0a]"
        style={{ minHeight: 0 }}
      />
      
      {/* Meeting attendance tracker */}
      <MeetingAttendance roomName={room} />
    </div>
  );
}

// Add window type declaration
declare global {
  interface Window {
    JitsiMeetExternalAPI: new (
      domain: string,
      options: {
        roomName: string;
        parentNode: HTMLElement;
        jwt?: string;
        configOverwrite?: Record<string, unknown>;
        interfaceConfigOverwrite?: Record<string, unknown>;
        userInfo?: { displayName?: string; email?: string };
      }
    ) => JitsiApi;
  }
}
