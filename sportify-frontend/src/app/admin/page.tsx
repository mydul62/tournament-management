import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, PlusCircle, Trophy, Shield, Activity, Users, LogOut, CheckCircle2, Award, Settings } from "lucide-react";
import { requireAdminUser } from "@/data/auth/get-current-user";
import { getTournaments } from "@/data/tournaments/get-tournaments";
import { getMatches } from "@/data/matches/get-matches";
import { logoutAction } from "@/actions/auth/logout-action";

export const metadata = {
  title: "Admin Console — SPORTIFY",
  description: "Protected administrator dashboard to create tournaments and manage leagues.",
};

export default async function AdminDashboardPage() {
  const user = await requireAdminUser();

  // Strict Admin Guard: Only logged in Admin or Organizer can view this page
  if (!user) {
    redirect("/login?error=unauthorized");
  }

  const tournaments = await getTournaments();
  const matches = await getMatches();

  return (
    <div className="space-y-10 py-4">
      {/* Header Banner */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl shadow-lg shadow-emerald-500/20">
              {user.avatar || "👑"}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{user.name}</h1>
                <span className="bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Logged in as {user.email} • Full System Administrator Access</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/admin/tournaments/create"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center space-x-2 transition-all shadow-lg shadow-emerald-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Host New Tournament</span>
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Admin Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center space-x-3 text-slate-400 text-xs font-semibold">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span>Tournaments</span>
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
            <span>Teams Registered</span>
          </div>
          <p className="text-3xl font-black text-white mt-2">8</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center space-x-3 text-slate-400 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Security Status</span>
          </div>
          <p className="text-sm font-extrabold text-emerald-400 mt-3 flex items-center space-x-1">
            <span>Role Verified</span>
          </p>
        </div>
      </div>

      {/* Managed Tournaments Table */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-emerald-400" />
            <span>Tournament Management Console</span>
          </h3>

          <Link
            href="/admin/tournaments/create"
            className="text-xs font-bold text-emerald-400 hover:underline flex items-center space-x-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create New</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-800">
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
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase">
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-3">
                    <Link
                      href={`/tournaments/${t.id}`}
                      className="text-emerald-400 hover:underline font-bold"
                    >
                      View Hub
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
