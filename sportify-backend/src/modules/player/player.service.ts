import { IPlayer } from "./player.interface";

export class PlayerService {
  static async getPlayers() {
    return [
      { id: "p-1", name: "Lucas Sterling", number: 10, position: "Striker", teamId: "team-1", teamName: "Thunder Strikers FC", goals: 9, assists: 4 },
      { id: "p-2", name: "Victor Vance", number: 9, position: "Forward", teamId: "team-2", teamName: "Apex Predators", goals: 7, assists: 3 },
    ];
  }

  static async createPlayer(payload: IPlayer) {
    return { id: `p-${Date.now()}`, ...payload };
  }
}
