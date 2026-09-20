"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { Match, MatchEvent } from "@/types/match";

interface LiveScoreTrackerProps {
  initialMatch: Match;
}

export function LiveScoreTracker({ initialMatch }: LiveScoreTrackerProps) {
  const [match, setMatch] = useState<Match>(initialMatch);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Connect to backend Socket.io server
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

    // Dynamic import to keep bundle small
    import("socket.io-client").then(({ io }) => {
      const socket = io(socketUrl, {
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        setIsConnected(true);
        socket.emit("joinMatch", initialMatch.id);
      });

      socket.on("scoreUpdated", (data: { homeScore: number; awayScore: number; minute?: number }) => {
        setMatch((prev) => ({
          ...prev,
          homeScore: data.homeScore,
          awayScore: data.awayScore,
          minute: data.minute !== undefined ? data.minute : prev.minute,
          status: "LIVE",
        }));
      });

      socket.on("eventAdded", (newEvent: MatchEvent) => {
        setMatch((prev) => ({
          ...prev,
          events: [newEvent, ...(prev.events || [])],
        }));
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });

      return () => {
        socket.emit("leaveMatch", initialMatch.id);
        socket.disconnect();
      };
    }).catch(() => {
      // Socket server offline fallback
      setIsConnected(false);
    });
  }, [initialMatch.id]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800 text-xs">
        <span className="flex items-center space-x-2 text-slate-400">
          <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? "bg-emerald-500 animate-ping" : "bg-amber-500"}`} />
          <span>{isConnected ? "Realtime Socket.io Connected" : "Local Live State"}</span>
        </span>
        <span className="font-bold text-emerald-400">{match.minute}&apos; Live</span>
      </div>
    </div>
  );
}
