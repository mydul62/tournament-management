export interface Team {
  id: string;
  name: string;
  shortName: string;
  logoUrl?: string;
  managerName?: string;
  stadium?: string;
  establishedYear?: number;
  playersCount?: number;
  stats?: {
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsScored: number;
  };
}
