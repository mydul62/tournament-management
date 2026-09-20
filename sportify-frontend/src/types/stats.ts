export interface TopScorer {
  playerId: string;
  playerName: string;
  teamName: string;
  teamLogo?: string;
  goals: number;
  matchesPlayed: number;
  avatarUrl?: string;
}

export interface TopAssist {
  playerId: string;
  playerName: string;
  teamName: string;
  teamLogo?: string;
  assists: number;
  matchesPlayed: number;
  avatarUrl?: string;
}
