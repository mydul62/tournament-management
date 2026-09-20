import "server-only";
import { cookies } from "next/headers";
import { User } from "@/types/user";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("sportify_user")?.value;

    if (!userCookie) {
      return null;
    }

    const user: User = JSON.parse(userCookie);
    return user;
  } catch (error) {
    return null;
  }
}

export async function requireAdminUser(): Promise<User | null> {
  const user = await getCurrentUser();
  if (!user || (user.role !== "ADMIN" && user.role !== "ORGANIZER")) {
    return null;
  }
  return user;
}
