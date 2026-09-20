import { Server, Socket } from "socket.io";

export function registerMatchHandlers(io: Server, socket: Socket) {
  socket.on("joinMatch", (matchId: string) => {
    socket.join(`match_${matchId}`);
    console.log(`Socket ${socket.id} joined match room: match_${matchId}`);
  });

  socket.on("leaveMatch", (matchId: string) => {
    socket.leave(`match_${matchId}`);
    console.log(`Socket ${socket.id} left match room: match_${matchId}`);
  });

  socket.on("updateScore", (data: { matchId: string; homeScore: number; awayScore: number; minute?: number }) => {
    io.to(`match_${data.matchId}`).emit("scoreUpdated", data);
  });
}
