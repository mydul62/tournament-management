import http from "http";
import app from "./app";
import { config } from "./config/env";
import { initSocketServer } from "./sockets/socket";

async function main() {
  const server = http.createServer(app);

  // Initialize Socket.io Realtime Server
  initSocketServer(server);

  server.listen(config.port, () => {
    console.log(`🚀 SPORTIFY Backend Server listening on http://localhost:${config.port}`);
    console.log(`📡 API endpoint: http://localhost:${config.port}/api/v1`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
