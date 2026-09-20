import { TopScorer, TopAssist } from "@/types/stats";

export const MOCK_TOP_SCORERS: TopScorer[] = [
  { playerId: "p-1", playerName: "Lucas 'Lightning' Sterling", teamName: "Thunder Strikers FC", teamLogo: "⚡", goals: 9, matchesPlayed: 7, avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
  { playerId: "p-2", playerName: "Victor 'Hawk' Vance", teamName: "Apex Predators", teamLogo: "🦅", goals: 7, matchesPlayed: 7, avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { playerId: "p-4", playerName: "Ethan Knight", teamName: "Titan Warriors", teamLogo: "🛡️", goals: 5, matchesPlayed: 6, avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop" },
  { playerId: "p-5", playerName: "Gabriel Santos", teamName: "Cyber Panthers", teamLogo: "🐆", goals: 4, matchesPlayed: 7, avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" },
];

export const MOCK_TOP_ASSISTS: TopAssist[] = [
  { playerId: "p-3", playerName: "Mateo Silva", teamName: "Thunder Strikers FC", teamLogo: "⚡", assists: 7, matchesPlayed: 7, avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
  { playerId: "p-5", playerName: "Gabriel Santos", teamName: "Cyber Panthers", teamLogo: "🐆", assists: 6, matchesPlayed: 7, avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" },
  { playerId: "p-4", playerName: "Ethan Knight", teamName: "Titan Warriors", teamLogo: "🛡️", assists: 5, matchesPlayed: 6, avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop" },
  { playerId: "p-1", playerName: "Lucas 'Lightning' Sterling", teamName: "Thunder Strikers FC", teamLogo: "⚡", assists: 4, matchesPlayed: 7, avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
];
