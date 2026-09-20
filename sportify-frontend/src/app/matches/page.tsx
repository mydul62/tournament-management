import { Activity, Calendar } from "lucide-react";
import { getMatches } from "@/data/matches/get-matches";
import { MatchCard } from "@/components/matches/match-card";

export const metadata = {
  title: "Match Center — SPORTIFY",
  description: "Live match scores, upcoming fixtures, and detailed match event logs.",
};

export default async function MatchesPage() {
  const matches = await getMatches();
  const liveMatches = matches.filter((m) => m.status === "LIVE");
  const upcomingMatches = matches.filter((m) => m.status === "SCHEDULED");
  const finishedMatches = matches.filter((m) => m.status === "FINISHED");

  return (
    <div className="space-y-10 py-4">
      {/* Header */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Match Center</h1>
            <p className="text-sm text-slate-400">Live games, upcoming schedules, and finished match logs</p>
          </div>
        </div>
      </div>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-emerald-400 flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Matches ({liveMatches.length})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Matches */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <span>Upcoming Fixtures</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingMatches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </section>

      {/* Finished Matches */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Activity className="w-5 h-5 text-slate-400" />
          <span>Recent Results</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {finishedMatches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
