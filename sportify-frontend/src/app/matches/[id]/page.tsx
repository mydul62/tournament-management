import { getMatch } from "@/data/matches/get-match";
import { Activity, Clock, Shield, Flag, Award, AlertCircle } from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";

interface MatchPageProps {
  params: Promise<{ id: string }>;
}

export default async function MatchDetailPage({ params }: MatchPageProps) {
  const { id } = await params;
  const match = await getMatch(id);

  if (!match) {
    return (
      <div className="py-16 text-center text-slate-400">
        Match not found.
      </div>
    );
  }

  const isLive = match.status === "LIVE";

  return (
    <div className="space-y-10 py-4 max-w-4xl mx-auto">
      {/* Match Scoreboard Hero */}
      <div className="glass-card rounded-3xl p-8 border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
        <div className="text-center text-xs text-slate-400 font-semibold mb-6 uppercase tracking-wider">
          {match.tournamentName} • {match.round || "Matchday"}
        </div>

        <div className="grid grid-cols-7 items-center text-center">
          {/* Home Team */}
          <div className="col-span-3 flex flex-col items-center space-y-3">
            <span className="text-5xl sm:text-6xl">{match.homeTeam.logoUrl || "⚡"}</span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white">{match.homeTeam.name}</h2>
          </div>

          {/* Scoreboard */}
          <div className="col-span-1 flex flex-col items-center justify-center space-y-2">
            <div className="bg-slate-950 px-5 py-3 rounded-2xl border border-slate-800 font-black text-3xl sm:text-4xl text-emerald-400 shadow-2xl">
              {match.homeScore} - {match.awayScore}
            </div>
            {isLive ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 animate-pulse">
                {match.minute}&apos; LIVE
              </span>
            ) : (
              <span className="text-xs text-slate-400 font-medium">{match.status}</span>
            )}
          </div>

          {/* Away Team */}
          <div className="col-span-3 flex flex-col items-center space-y-3">
            <span className="text-5xl sm:text-6xl">{match.awayTeam.logoUrl || "🛡️"}</span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white">{match.awayTeam.name}</h2>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span>📍 {match.venue || "Main Stadium"}</span>
          <span>📅 {formatDate(match.kickoffTime)} • {formatTime(match.kickoffTime)}</span>
        </div>
      </div>

      {/* Timeline Events */}
      <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white">Live Timeline Events</h3>
        </div>

        {match.events && match.events.length > 0 ? (
          <div className="space-y-4">
            {match.events.map((event) => (
              <div
                key={event.id}
                className="flex items-center space-x-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800"
              >
                <span className="font-black text-emerald-400 text-sm bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                  {event.minute}&apos;
                </span>
                <span className="text-lg">
                  {event.type === "GOAL" ? "⚽" : event.type === "YELLOW_CARD" ? "🟨" : "🟥"}
                </span>
                <div className="flex-1">
                  <span className="font-bold text-slate-100">{event.playerName}</span>
                  {event.detail && <p className="text-xs text-slate-400 mt-0.5">{event.detail}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">
            No match events recorded yet for this fixture.
          </div>
        )}
      </div>
    </div>
  );
}
