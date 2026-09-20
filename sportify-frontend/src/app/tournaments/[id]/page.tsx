import { getTournament } from "@/data/tournaments/get-tournament";
import { getTournamentStandings } from "@/data/tournaments/get-tournament-standings";
import { getTournamentFixtures } from "@/data/tournaments/get-tournament-fixtures";
import { StandingsTable } from "@/components/tournaments/standings-table";
import { MatchCard } from "@/components/matches/match-card";
import { Trophy, Calendar, MapPin, Users, Award, Shield } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface TournamentPageProps {
  params: Promise<{ id: string }>;
}

export default async function TournamentDetailPage({ params }: TournamentPageProps) {
  const { id } = await params;
  const tournament = await getTournament(id);

  if (!tournament) {
    return (
      <div className="py-16 text-center text-slate-400">
        Tournament not found.
      </div>
    );
  }

  const standings = await getTournamentStandings(tournament.id);
  const fixtures = await getTournamentFixtures(tournament.id);

  return (
    <div className="space-y-10 py-4">
      {/* Banner / Header */}
      <div className="relative rounded-3xl overflow-hidden glass-card border border-slate-800 bg-slate-900/60 p-6 sm:p-10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-slate-950">
                {tournament.status}
              </span>
              <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-lg border border-slate-700">
                {tournament.format}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white">{tournament.name}</h1>

            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              {tournament.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center space-x-1.5"><Calendar className="w-4 h-4 text-emerald-400" /> <span>{formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}</span></span>
              {tournament.location && <span className="flex items-center space-x-1.5"><MapPin className="w-4 h-4 text-emerald-400" /> <span>{tournament.location}</span></span>}
              <span className="flex items-center space-x-1.5"><Users className="w-4 h-4 text-emerald-400" /> <span>{tournament.teamsCount || 8} Teams</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Standings Table Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">League Table</h2>
            <p className="text-xs text-slate-400">Official tournament points & standings</p>
          </div>
        </div>

        <StandingsTable standings={standings} />
      </div>

      {/* Fixtures & Results Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Fixtures & Results</h2>
            <p className="text-xs text-slate-400">Recent match outcomes and upcoming clashes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fixtures.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </div>
  );
}
