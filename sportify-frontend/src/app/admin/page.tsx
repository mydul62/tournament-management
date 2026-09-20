import Link from "next/link";
import { LayoutDashboard, PlusCircle, Trophy, Shield, Activity, Users } from "lucide-react";
import { getTournaments } from "@/data/tournaments/get-tournaments";
import { getMatches } from "@/data/matches/get-matches";

export const metadata = {
  title: "Admin Console — SPORTIFY",
  description: "Organizer dashboard to create tournaments, manage fixtures, and update match scores.",
};

export default async function AdminPage() {
  const tournaments = await getTournaments();
  const matches = await getMatches();

  return (
    <div className="space-y-10 py-4">
      {/* Header */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Organizer Dashboard</h1>
              <p className="text-sm text-slate-400">Manage leagues, generate brackets, and log scores</p>
            </div>
          </div>

          <Link
            href="/admin/tournaments/create"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center space-x-2 self-start sm:self-auto shadow-lg shadow-emerald-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Tournament</span>
          </Link>
        </div>
      </div>

      {/* Stats Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center space-x-3 text-slate-400 text-xs font-semibold">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span>Total Tournaments</span>
          </div>
          <p className="text-3xl font-black text-white mt-2">{tournaments.length}</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center space-x-3 text-slate-400 text-xs font-semibold">
            <Activity className="w-4 h-4 text-purple-400" />
            <span>Active Matches</span>
          </div>
          <p className="text-3xl font-black text-white mt-2">
            {matches.filter((m) => m.status === "LIVE").length}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center space-x-3 text-slate-400 text-xs font-semibold">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>Registered Clubs</span>
          </div>
          <p className="text-3xl font-black text-white mt-2">8</p>
        </div>
      </div>

      {/* Managed Tournaments Table */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white">Your Managed Tournaments</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 uppercase font-bold">
              <tr>
                <th className="p-3">Tournament Name</th>
                <th className="p-3">Format</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {tournaments.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">{t.name}</td>
                  <td className="p-3 text-slate-300">{t.format}</td>
                  <td className="p-3">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[11px] font-bold">
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <Link
                      href={`/tournaments/${t.id}`}
                      className="text-emerald-400 hover:underline font-semibold"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
