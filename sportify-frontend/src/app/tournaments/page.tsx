import { Trophy, Filter } from "lucide-react";
import { getTournaments } from "@/data/tournaments/get-tournaments";
import { TournamentCard } from "@/components/tournaments/tournament-card";

export const metadata = {
  title: "Tournaments Hub — SPORTIFY",
  description: "Browse active leagues, upcoming knockout tournaments, and completed sporting events.",
};

export default async function TournamentsPage() {
  const tournaments = await getTournaments();

  return (
    <div className="space-y-8 py-4">
      {/* Page Header */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Tournaments Hub</h1>
            <p className="text-sm text-slate-400">Explore leagues, cups, and campus sports events</p>
          </div>
        </div>
      </div>

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))}
      </div>
    </div>
  );
}
