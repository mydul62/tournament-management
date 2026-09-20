import { Socket } from "socket.io";
import { verifyToken } from "../utils/jwt";

export function socketAuthMiddleware(socket: Socket, next: (err?: Error) => void) {
  const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new Error("Authentication token missing"));
  }

  try {
    const decoded = verifyToken(token);
    (socket as any).user = decoded;
    next();
  } catch (error) {
    next(new Error("Unauthorized socket connection"));
  }
}
