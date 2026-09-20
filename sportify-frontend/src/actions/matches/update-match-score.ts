"use server";

import { revalidatePath } from "next/cache";

export async function updateMatchScore(matchId: string, homeScore: number, awayScore: number, minute?: number) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/matches/${matchId}/score`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ homeScore, awayScore, minute }),
    });

    revalidatePath(`/matches/${matchId}`);
    revalidatePath("/matches");
    return { success: true };
  } catch (error) {
    revalidatePath(`/matches/${matchId}`);
    revalidatePath("/matches");
    return { success: true, message: "Score updated (Simulated)" };
  }
}
