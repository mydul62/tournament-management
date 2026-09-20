import { TopScorer } from "@/types/stats";
import { Award, Target } from "lucide-react";

interface LeaderboardProps {
  scorers: TopScorer[];
}

export function Leaderboard({ scorers }: LeaderboardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Golden Boot Race</h3>
          <p className="text-xs text-slate-400">Top goalscorers across active tournaments</p>
        </div>
      </div>

      <div className="space-y-4">
        {scorers.map((player, idx) => {
          const isWinner = idx === 0;
          return (
            <div
              key={player.playerId}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
                isWinner
                  ? "bg-gradient-to-r from-amber-500/10 to-slate-900 border-amber-500/30"
                  : "bg-slate-900/60 border-slate-800/80"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    isWinner
                      ? "bg-amber-400 text-slate-950 font-black"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {idx + 1}
                </span>

                <div>
                  <h4 className="font-bold text-sm text-slate-100 flex items-center space-x-2">
                    <span>{player.playerName}</span>
                  </h4>
                  <p className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
                    <span>{player.teamLogo || "🛡️"}</span>
                    <span>{player.teamName}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <Target className="w-4 h-4 text-amber-400" />
                <span className="font-black text-amber-400 text-base">{player.goals}</span>
                <span className="text-slate-500 text-xs font-semibold">goals</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
