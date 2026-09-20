export class UserService {
  static async getUsers() {
    return [
      { id: "u-1", name: "System Admin", email: "admin@sportify.com", role: "ADMIN" },
      { id: "u-2", name: "Coach Marcus Vance", email: "marcus@sportify.com", role: "TEAM_MANAGER" },
    ];
  }

  static async getUserProfile(id: string) {
    return { id, name: "System Admin", email: "admin@sportify.com", role: "ADMIN" };
  }
}
