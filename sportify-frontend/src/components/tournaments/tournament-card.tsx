import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, Trophy, ChevronRight } from "lucide-react";
import { Tournament } from "@/types/tournament";
import { formatDate } from "@/lib/utils";

interface TournamentCardProps {
  tournament: Tournament;
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const isOngoing = tournament.status === "ONGOING";

  return (
    <div className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col h-full border border-slate-800 bg-slate-900/60">
      {/* Banner / Header Image */}
      <div className="relative h-44 w-full bg-slate-800 overflow-hidden">
        {tournament.bannerUrl ? (
          <img
            src={tournament.bannerUrl}
            alt={tournament.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-slate-700" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
              isOngoing
                ? "bg-emerald-500 text-slate-950 shadow-emerald-500/30"
                : tournament.status === "UPCOMING"
                ? "bg-blue-500 text-white"
                : "bg-slate-700 text-slate-300"
            }`}
          >
            {tournament.status}
          </span>
        </div>

        {/* Format Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-slate-950/80 backdrop-blur-md text-slate-300 text-xs px-2.5 py-1 rounded-lg border border-slate-700 font-medium">
            {tournament.format}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
            {tournament.name}
          </h3>
          <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {tournament.description}
          </p>
        </div>

        <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>{formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}</span>
          </div>

          {tournament.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="truncate">{tournament.location}</span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>{tournament.teamsCount || 8} Teams Registered</span>
          </div>
        </div>

        {/* Action button */}
        <Link
          href={`/tournaments/${tournament.slug || tournament.id}`}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all duration-200 group"
        >
          <span>View Tournament Hub</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
