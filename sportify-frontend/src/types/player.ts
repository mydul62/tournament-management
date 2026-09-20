export interface Player {
  id: string;
  name: string;
  number?: number;
  position: string;
  avatarUrl?: string;
  teamId: string;
  teamName: string;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  matchesPlayed: number;
}
