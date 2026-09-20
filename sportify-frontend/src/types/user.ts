export type UserRole = "ADMIN" | "ORGANIZER" | "TEAM_MANAGER" | "PLAYER" | "FAN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}
