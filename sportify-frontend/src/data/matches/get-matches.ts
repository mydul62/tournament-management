import "server-only";
import { Match } from "@/types/match";
import { fetcher } from "@/lib/api/fetcher";
import { MOCK_MATCHES } from "@/data/mock/matches";

export async function getMatches(): Promise<Match[]> {
  try {
    const data = await fetcher<Match[]>("/matches", {
      revalidate: 15,
    });
    return data;
  } catch (error) {
    return MOCK_MATCHES;
  }
}

export async function getMatch(id: string): Promise<Match | null> {
  try {
    const data = await fetcher<Match>(`/matches/${id}`, {
      cache: "no-store",
    });
    return data;
  } catch (error) {
    return MOCK_MATCHES.find((m) => m.id === id) || MOCK_MATCHES[0];
  }
}

export async function getLiveMatches(): Promise<Match[]> {
  try {
    const data = await fetcher<Match[]>("/matches/live", {
      cache: "no-store",
    });
    return data;
  } catch (error) {
    return MOCK_MATCHES.filter((m) => m.status === "LIVE");
  }
}
