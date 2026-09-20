export class StatsService {
  static async getTopScorers(tournamentId?: string) {
    return [
      { playerId: "p-1", playerName: "Lucas Sterling", teamName: "Thunder Strikers FC", teamLogo: "⚡", goals: 9, matchesPlayed: 7 },
      { playerId: "p-2", playerName: "Victor Vance", teamName: "Apex Predators", teamLogo: "🦅", goals: 7, matchesPlayed: 7 },
    ];
  }

  static async getTopAssists(tournamentId?: string) {
    return [
      { playerId: "p-3", playerName: "Mateo Silva", teamName: "Thunder Strikers FC", teamLogo: "⚡", assists: 7, matchesPlayed: 7 },
    ];
  }
}
