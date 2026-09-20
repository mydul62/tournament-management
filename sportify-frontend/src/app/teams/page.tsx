import { Shield, Users, Award } from "lucide-react";
import { getTeams } from "@/data/teams/get-teams";

export const metadata = {
  title: "Registered Teams — SPORTIFY",
  description: "Browse registered teams, squad rosters, and historical stats.",
};

export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Registered Squads</h1>
            <p className="text-sm text-slate-400">Participating university teams and club profiles</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{team.logoUrl || "🛡️"}</span>
                <div>
                  <h3 className="font-extrabold text-lg text-white">{team.name}</h3>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {team.shortName}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-400 pt-3 border-t border-slate-800/80">
              <p>Manager: <span className="text-slate-200 font-semibold">{team.managerName}</span></p>
              <p>Home Ground: <span className="text-slate-200 font-semibold">{team.stadium}</span></p>
              <p>Squad Size: <span className="text-slate-200 font-semibold">{team.playersCount} Players</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
