import { Award, Target, Zap } from "lucide-react";
import { getTopScorers, getTopAssists } from "@/data/stats/get-stats";
import { Leaderboard } from "@/components/stats/leaderboard";

export const metadata = {
  title: "Leaderboard & Stats — SPORTIFY",
  description: "Golden Boot top goalscorers and top assist leaders across all tournaments.",
};

export default async function StatsPage() {
  const topScorers = await getTopScorers();
  const topAssists = await getTopAssists();

  return (
    <div className="space-y-10 py-4">
      {/* Header */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Player Leaderboards</h1>
            <p className="text-sm text-slate-400">Top scorers, assist providers, and tournament awards</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Scorers */}
        <Leaderboard scorers={topScorers} />

        {/* Top Assists */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Top Playmakers</h3>
              <p className="text-xs text-slate-400">Most assists created</p>
            </div>
          </div>

          <div className="space-y-4">
            {topAssists.map((player, idx) => (
              <div
                key={player.playerId}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-100">{player.playerName}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{player.teamLogo} {player.teamName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="font-black text-blue-400 text-base">{player.assists}</span>
                  <span className="text-slate-500 text-xs font-semibold">assists</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
