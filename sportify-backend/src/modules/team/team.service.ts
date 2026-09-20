import { ITeam } from "./team.interface";

export class TeamService {
  static async getAllTeams() {
    return [
      { id: "team-1", name: "Thunder Strikers FC", shortName: "TSFC", logoUrl: "⚡", managerName: "Coach Marcus Vance", stadium: "Thunder Dome Arena", playersCount: 18 },
      { id: "team-2", name: "Apex Predators", shortName: "APEX", logoUrl: "🦅", managerName: "Coach Elena Rostova", stadium: "Predator Park Stadium", playersCount: 20 },
    ];
  }

  static async getTeamById(id: string) {
    return { id, name: "Thunder Strikers FC", shortName: "TSFC", logoUrl: "⚡", managerName: "Coach Marcus Vance", stadium: "Thunder Dome Arena", playersCount: 18 };
  }

  static async createTeam(payload: ITeam) {
    return { id: `team-${Date.now()}`, ...payload };
  }
}
