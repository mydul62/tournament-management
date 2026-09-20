import "server-only";
import { Match } from "@/types/match";
import { fetcher } from "@/lib/api/fetcher";
import { MOCK_MATCHES } from "@/data/mock/matches";

export async function getTournamentFixtures(tournamentId: string): Promise<Match[]> {
  try {
    const data = await fetcher<Match[]>(`/tournaments/${tournamentId}/matches`, {
      revalidate: 30,
    });
    return data;
  } catch (error) {
    return MOCK_MATCHES.filter((m) => m.tournamentId === tournamentId || tournamentId === "tour-1");
  }
}
