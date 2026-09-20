export type TournamentFormat = "LEAGUE" | "KNOCKOUT" | "GROUP_AND_KNOCKOUT";
export type TournamentStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

export interface Tournament {
  id: string;
  name: string;
  slug: string;
  description?: string;
  bannerUrl?: string;
  location?: string;
  startDate: string;
  endDate: string;
  format: TournamentFormat;
  status: TournamentStatus;
  teamsCount?: number;
  matchesCount?: number;
  organizerName?: string;
  createdAt?: string;
}

export interface StandingEntry {
  id: string;
  teamId: string;
  teamName: string;
  teamLogo?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  position: number;
}
