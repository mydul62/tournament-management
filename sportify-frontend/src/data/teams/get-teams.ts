import "server-only";
import { Team } from "@/types/team";
import { fetcher } from "@/lib/api/fetcher";
import { MOCK_TEAMS } from "@/data/mock/teams";

export async function getTeams(): Promise<Team[]> {
  try {
    const data = await fetcher<Team[]>("/teams", {
      revalidate: 60,
    });
    return data;
  } catch (error) {
    return MOCK_TEAMS;
  }
}

export async function getTeam(id: string): Promise<Team | null> {
  try {
    const data = await fetcher<Team>(`/teams/${id}`, {
      revalidate: 30,
    });
    return data;
  } catch (error) {
    return MOCK_TEAMS.find((t) => t.id === id) || MOCK_TEAMS[0];
  }
}
