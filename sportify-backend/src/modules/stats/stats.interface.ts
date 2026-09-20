export interface ITopScorer {
  playerId: string;
  playerName: string;
  teamName: string;
  teamLogo?: string;
  goals: number;
  matchesPlayed: number;
}

export interface ITopAssist {
  playerId: string;
  playerName: string;
  teamName: string;
  teamLogo?: string;
  assists: number;
  matchesPlayed: number;
}
