import "server-only";
import { Match } from "@/types/match";
import { fetcher } from "@/lib/api/fetcher";
import { MOCK_MATCHES } from "@/data/mock/matches";

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
