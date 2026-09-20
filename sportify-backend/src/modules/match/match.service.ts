export class MatchService {
  static async getAllMatches() {
    return [
      {
        id: "m-101",
        tournamentId: "tour-1",
        tournamentName: "Premier Campus Super League 2026",
        homeTeam: { id: "team-1", name: "Thunder Strikers FC", shortName: "TSFC", logoUrl: "⚡" },
        awayTeam: { id: "team-2", name: "Apex Predators", shortName: "APEX", logoUrl: "🦅" },
        homeScore: 2,
        awayScore: 1,
        status: "LIVE",
        minute: 74,
        kickoffTime: "2026-09-20T18:00:00Z",
        venue: "Main Campus Arena",
        round: "Matchday 8",
      },
    ];
  }

  static async getLiveMatches() {
    return [
      {
        id: "m-101",
        tournamentId: "tour-1",
        tournamentName: "Premier Campus Super League 2026",
        homeTeam: { id: "team-1", name: "Thunder Strikers FC", shortName: "TSFC", logoUrl: "⚡" },
        awayTeam: { id: "team-2", name: "Apex Predators", shortName: "APEX", logoUrl: "🦅" },
        homeScore: 2,
        awayScore: 1,
        status: "LIVE",
        minute: 74,
        kickoffTime: "2026-09-20T18:00:00Z",
        venue: "Main Campus Arena",
      },
    ];
  }

  static async getMatchById(id: string) {
    return {
      id,
      tournamentId: "tour-1",
      tournamentName: "Premier Campus Super League 2026",
      homeTeam: { id: "team-1", name: "Thunder Strikers FC", shortName: "TSFC", logoUrl: "⚡" },
      awayTeam: { id: "team-2", name: "Apex Predators", shortName: "APEX", logoUrl: "🦅" },
      homeScore: 2,
      awayScore: 1,
      status: "LIVE",
      minute: 74,
      kickoffTime: "2026-09-20T18:00:00Z",
      venue: "Main Campus Arena",
      events: [
        { id: "e1", type: "GOAL", minute: 14, teamId: "team-1", playerName: "Lucas Sterling", detail: "Header from corner" },
        { id: "e2", type: "GOAL", minute: 38, teamId: "team-2", playerName: "Victor Vance", detail: "Right foot strike" },
      ],
    };
  }

  static async updateScore(id: string, homeScore: number, awayScore: number, minute?: number) {
    return { id, homeScore, awayScore, minute: minute || 90, status: "LIVE" };
  }
}
