import { StandingEntry } from "@/types/tournament";

interface StandingsTableProps {
  standings: StandingEntry[];
}

export function StandingsTable({ standings }: StandingsTableProps) {
  if (!standings || standings.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 glass-card rounded-2xl">
        No standings available for this tournament yet.
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-slate-800">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 uppercase font-bold border-b border-slate-800">
            <tr>
              <th className="py-3.5 px-4 w-12 text-center">Pos</th>
              <th className="py-3.5 px-4">Club</th>
              <th className="py-3.5 px-3 text-center">P</th>
              <th className="py-3.5 px-3 text-center">W</th>
              <th className="py-3.5 px-3 text-center">D</th>
              <th className="py-3.5 px-3 text-center">L</th>
              <th className="py-3.5 px-3 text-center hidden sm:table-cell">GF</th>
              <th className="py-3.5 px-3 text-center hidden sm:table-cell">GA</th>
              <th className="py-3.5 px-3 text-center">GD</th>
              <th className="py-3.5 px-4 text-center font-extrabold text-emerald-400">PTS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {standings.map((entry, idx) => {
              const isTop = idx === 0;
              const isChampionsLeague = idx < 2;

              return (
                <tr
                  key={entry.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    isTop ? "bg-emerald-500/5 font-semibold" : ""
                  }`}
                >
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        isTop
                          ? "bg-emerald-500 text-slate-950"
                          : isChampionsLeague
                          ? "bg-blue-500/20 text-blue-400"
                          : "text-slate-400"
                      }`}
                    >
                      {entry.position}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex items-center space-x-3">
                    <span className="text-lg">{entry.teamLogo || "🛡️"}</span>
                    <span className="font-bold text-slate-100">{entry.teamName}</span>
                  </td>
                  <td className="py-3 px-3 text-center text-slate-300">{entry.played}</td>
                  <td className="py-3 px-3 text-center text-slate-300">{entry.won}</td>
                  <td className="py-3 px-3 text-center text-slate-300">{entry.drawn}</td>
                  <td className="py-3 px-3 text-center text-slate-300">{entry.lost}</td>
                  <td className="py-3 px-3 text-center text-slate-400 hidden sm:table-cell">{entry.goalsFor}</td>
                  <td className="py-3 px-3 text-center text-slate-400 hidden sm:table-cell">{entry.goalsAgainst}</td>
                  <td className="py-3 px-3 text-center text-slate-300 font-semibold">
                    {entry.goalDiff > 0 ? `+${entry.goalDiff}` : entry.goalDiff}
                  </td>
                  <td className="py-3 px-4 text-center font-black text-emerald-400 text-sm">{entry.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
