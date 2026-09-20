import { ITournament } from "./tournament.interface";

export class TournamentService {
  static async getAllTournaments() {
    return [
      {
        id: "tour-1",
        name: "Premier Campus Super League 2026",
        slug: "premier-campus-super-league-2026",
        description: "The ultimate university football showdown featuring top varsity teams.",
        bannerUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop",
        location: "Main Campus Arena",
        startDate: "2026-09-01",
        endDate: "2026-10-30",
        format: "LEAGUE",
        status: "ONGOING",
        teamsCount: 8,
        matchesCount: 28,
        organizerName: "Sportify Athletics Board",
      },
    ];
  }

  static async getTournamentById(id: string) {
    return {
      id,
      name: "Premier Campus Super League 2026",
      slug: "premier-campus-super-league-2026",
      description: "The ultimate university football showdown featuring top varsity teams.",
      bannerUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop",
      location: "Main Campus Arena",
      startDate: "2026-09-01",
      endDate: "2026-10-30",
      format: "LEAGUE",
      status: "ONGOING",
      teamsCount: 8,
    };
  }

  static async getTournamentStandings(id: string) {
    return [
      { id: "s1", teamId: "team-1", teamName: "Thunder Strikers FC", teamLogo: "⚡", played: 7, won: 5, drawn: 1, lost: 1, goalsFor: 18, goalsAgainst: 7, goalDiff: 11, points: 16, position: 1 },
      { id: "s2", teamId: "team-2", teamName: "Apex Predators", teamLogo: "🦅", played: 7, won: 4, drawn: 2, lost: 1, goalsFor: 15, goalsAgainst: 8, goalDiff: 7, points: 14, position: 2 },
      { id: "s3", teamId: "team-3", teamName: "Titan Warriors", teamLogo: "🛡️", played: 7, won: 4, drawn: 1, lost: 2, goalsFor: 12, goalsAgainst: 9, goalDiff: 3, points: 13, position: 3 },
    ];
  }

  static async createTournament(payload: ITournament) {
    return {
      id: `tour-${Date.now()}`,
      slug: payload.name.toLowerCase().replace(/\s+/g, "-"),
      ...payload,
      status: "UPCOMING",
      createdAt: new Date().toISOString(),
    };
  }
}
