"use client";

import Link from "next/link";
import { Activity } from "lucide-react";
import { Match } from "@/types/match";

interface LiveTickerProps {
  matches: Match[];
}

export function LiveTicker({ matches }: LiveTickerProps) {
  if (!matches || matches.length === 0) return null;

  return (
    <div className="bg-slate-950/90 border-b border-slate-800/60 py-2.5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-4">
        <div className="flex items-center space-x-2 shrink-0 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider animate-pulse">
          <Activity className="w-3.5 h-3.5" />
          <span>LIVE NOW</span>
        </div>

        <div className="flex items-center space-x-6 overflow-x-auto scrollbar-none py-1">
          {matches.map((match) => (
            <Link
              key={match.id}
              href={`/matches/${match.id}`}
              className="flex items-center space-x-3 bg-slate-900/80 hover:bg-slate-800/90 px-3.5 py-1.5 rounded-lg border border-slate-800 transition-colors shrink-0 text-xs font-semibold"
            >
              <span className="text-slate-300">{match.homeTeam.shortName}</span>
              <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-black text-xs">
                {match.homeScore} - {match.awayScore}
              </span>
              <span className="text-slate-300">{match.awayTeam.shortName}</span>
              <span className="text-emerald-400 font-medium pl-1">{match.minute}&apos;</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
