export interface IMatch {
  id?: string;
  tournamentId: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number;
  awayScore?: number;
  status?: "SCHEDULED" | "LIVE" | "HALFTIME" | "FINISHED" | "POSTPONED" | "CANCELLED";
  kickoffTime: string;
  venue?: string;
  round?: string;
  minute?: number;
}

export interface IMatchEvent {
  matchId: string;
  type: "GOAL" | "YELLOW_CARD" | "RED_CARD" | "SUB" | "PENALTY";
  minute: number;
  playerId?: string;
  detail?: string;
}
