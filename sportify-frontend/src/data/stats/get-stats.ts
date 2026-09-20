import "server-only";
import { TopScorer, TopAssist } from "@/types/stats";
import { fetcher } from "@/lib/api/fetcher";
import { MOCK_TOP_SCORERS, MOCK_TOP_ASSISTS } from "@/data/mock/stats";

export async function getTopScorers(tournamentId?: string): Promise<TopScorer[]> {
  try {
    const data = await fetcher<TopScorer[]>(`/stats/top-scorers${tournamentId ? `?tournamentId=${tournamentId}` : ""}`, {
      revalidate: 60,
    });
    return data;
  } catch (error) {
    return MOCK_TOP_SCORERS;
  }
}

export async function getTopAssists(tournamentId?: string): Promise<TopAssist[]> {
  try {
    const data = await fetcher<TopAssist[]>(`/stats/top-assists${tournamentId ? `?tournamentId=${tournamentId}` : ""}`, {
      revalidate: 60,
    });
    return data;
  } catch (error) {
    return MOCK_TOP_ASSISTS;
  }
}
