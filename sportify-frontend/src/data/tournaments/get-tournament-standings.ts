import "server-only";
import { StandingEntry } from "@/types/tournament";
import { fetcher } from "@/lib/api/fetcher";
import { MOCK_STANDINGS } from "@/data/mock/tournaments";

export async function getTournamentStandings(tournamentId: string): Promise<StandingEntry[]> {
  try {
    const data = await fetcher<StandingEntry[]>(`/tournaments/${tournamentId}/standings`, {
      revalidate: 60,
    });
    return data;
  } catch (error) {
    return MOCK_STANDINGS[tournamentId] || MOCK_STANDINGS["tour-1"];
  }
}
