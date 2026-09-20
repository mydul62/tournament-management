import Link from "next/link";
import { Activity, Clock } from "lucide-react";
import { Match } from "@/types/match";
import { formatDate, formatTime } from "@/lib/utils";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const isLive = match.status === "LIVE";
  const isFinished = match.status === "FINISHED";

  return (
    <Link
      href={`/matches/${match.id}`}
      className="block glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 bg-slate-900/60"
    >
      <div className="flex items-center justify-between text-xs text-slate-400 pb-3 mb-4 border-b border-slate-800/80">
        <span className="font-semibold text-slate-300">{match.tournamentName || "Tournament Match"}</span>
        {isLive ? (
          <span className="flex items-center space-x-1 text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 animate-pulse">
            <Activity className="w-3.5 h-3.5" />
            <span>LIVE {match.minute}&apos;</span>
          </span>
        ) : isFinished ? (
          <span className="bg-slate-800 text-slate-400 font-medium px-2.5 py-0.5 rounded">FT</span>
        ) : (
          <span className="flex items-center space-x-1 text-slate-400 font-medium">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{formatDate(match.kickoffTime)} • {formatTime(match.kickoffTime)}</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-7 items-center text-center">
        {/* Home Team */}
        <div className="col-span-3 flex flex-col items-center space-y-2">
          <span className="text-3xl">{match.homeTeam.logoUrl || "⚡"}</span>
          <span className="font-bold text-sm text-slate-100 line-clamp-1">{match.homeTeam.name}</span>
        </div>

        {/* Score / VS */}
        <div className="col-span-1 flex flex-col items-center justify-center">
          {isLive || isFinished ? (
            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-black text-xl tracking-wider text-emerald-400">
              {match.homeScore} - {match.awayScore}
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
              VS
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="col-span-3 flex flex-col items-center space-y-2">
          <span className="text-3xl">{match.awayTeam.logoUrl || "🛡️"}</span>
          <span className="font-bold text-sm text-slate-100 line-clamp-1">{match.awayTeam.name}</span>
        </div>
      </div>

      {match.venue && (
        <div className="mt-4 pt-3 border-t border-slate-800/60 text-center text-xs text-slate-500">
          📍 {match.venue}
        </div>
      )}
    </Link>
  );
}
