import "server-only";
import { Tournament } from "@/types/tournament";
import { fetcher } from "@/lib/api/fetcher";
import { MOCK_TOURNAMENTS } from "@/data/mock/tournaments";

export async function getTournaments(): Promise<Tournament[]> {
  try {
    const data = await fetcher<Tournament[]>("/tournaments", {
      revalidate: 60,
    });
    return data;
  } catch (error) {
    // Fallback to mock data during initial development before Express backend is started
    return MOCK_TOURNAMENTS;
  }
}
