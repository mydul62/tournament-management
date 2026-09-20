import Link from "next/link";
import { Trophy, Activity, Award, Shield, ArrowRight, Sparkles, Flame, PlusCircle } from "lucide-react";
import { getTournaments } from "@/data/tournaments/get-tournaments";
import { getMatches } from "@/data/matches/get-matches";
import { getTopScorers } from "@/data/stats/get-stats";
import { TournamentCard } from "@/components/tournaments/tournament-card";
import { MatchCard } from "@/components/matches/match-card";
import { Leaderboard } from "@/components/stats/leaderboard";

export default async function HomePage() {
  const tournaments = await getTournaments();
  const matches = await getMatches();
  const topScorers = await getTopScorers();

  const activeTournaments = tournaments.filter((t) => t.status === "ONGOING" || t.status === "UPCOMING");
  const featuredMatches = matches.slice(0, 3);

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden glass-card p-8 sm:p-12 border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Sports Management</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Manage & Track <br />
            <span className="gradient-text">Tournaments Live</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Automate fixtures, record match events, calculate real-time standings, and deliver instant live scores with Server-First architecture.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/tournaments"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center space-x-2 transition-all shadow-lg shadow-emerald-500/25"
            >
              <Trophy className="w-4 h-4" />
              <span>Explore Tournaments</span>
            </Link>

            <Link
              href="/admin/tournaments/create"
              className="px-6 py-3 rounded-xl glass-card hover:bg-slate-800 text-white font-bold text-sm flex items-center space-x-2 transition-all border border-slate-700"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Host a League</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tournaments Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Active Tournaments</h2>
              <p className="text-xs text-slate-400">Compete, follow standings, and stay up to date</p>
            </div>
          </div>

          <Link
            href="/tournaments"
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </section>

      {/* Featured Matches & Leaderboard Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Match Center Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Match Center</h2>
                <p className="text-xs text-slate-400">Live, upcoming, and recent match results</p>
              </div>
            </div>

            <Link
              href="/matches"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
            >
              <span>Full Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>

        {/* Right Column: Leaderboard */}
        <div className="space-y-6">
          <Leaderboard scorers={topScorers} />
        </div>
      </section>
    </div>
  );
}
