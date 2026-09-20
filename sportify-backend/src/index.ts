import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok", service: "Sportify API", timestamp: new Date() });
});

// Socket.io live updates
io.on("connection", (socket) => {
  console.log("Client connected to Live Socket Server:", socket.id);

  socket.on("joinMatch", (matchId) => {
    socket.join(`match_${matchId}`);
    console.log(`Socket ${socket.id} joined match room match_${matchId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 SPORTIFY Express API Server running on port ${PORT}`);
});
