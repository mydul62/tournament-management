export const ROLES = {
  ADMIN: "ADMIN",
  ORGANIZER: "ORGANIZER",
  TEAM_MANAGER: "TEAM_MANAGER",
  PLAYER: "PLAYER",
  FAN: "FAN",
} as const;

export type UserRole = keyof typeof ROLES;
