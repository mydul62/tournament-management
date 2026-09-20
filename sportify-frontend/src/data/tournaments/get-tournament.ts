import "server-only";
import { Tournament } from "@/types/tournament";
import { fetcher } from "@/lib/api/fetcher";
import { MOCK_TOURNAMENTS } from "@/data/mock/tournaments";

export async function getTournament(idOrSlug: string): Promise<Tournament | null> {
  try {
    const data = await fetcher<Tournament>(`/tournaments/${idOrSlug}`, {
      revalidate: 30,
    });
    return data;
  } catch (error) {
    const found = MOCK_TOURNAMENTS.find((t) => t.id === idOrSlug || t.slug === idOrSlug);
    return found || MOCK_TOURNAMENTS[0];
  }
}
