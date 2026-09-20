import { Server } from "socket.io";
import http from "http";
import { registerMatchHandlers } from "./match.socket";

export function initSocketServer(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`⚡ Client Connected: ${socket.id}`);

    registerMatchHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log(`🔌 Client Disconnected: ${socket.id}`);
    });
  });

  return io;
}
