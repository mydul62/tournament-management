export type MatchStatus = "SCHEDULED" | "LIVE" | "HALFTIME" | "FINISHED" | "POSTPONED" | "CANCELLED";

export interface MatchEvent {
  id: string;
  type: "GOAL" | "YELLOW_CARD" | "RED_CARD" | "SUB" | "PENALTY";
  minute: number;
  teamId: string;
  playerName: string;
  detail?: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  tournamentName: string;
  homeTeam: {
    id: string;
    name: string;
    shortName: string;
    logoUrl?: string;
  };
  awayTeam: {
    id: string;
    name: string;
    shortName: string;
    logoUrl?: string;
  };
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  kickoffTime: string;
  venue?: string;
  round?: string;
  minute?: number;
  events?: MatchEvent[];
}
