import { AppError } from "../../utils/app-error";
import { generateToken } from "../../utils/jwt";
import { ILoginPayload, IRegisterPayload, IAuthResponse } from "./auth.interface";

export class AuthService {
  static async login(payload: ILoginPayload): Promise<IAuthResponse> {
    const { email, password } = payload;

    // Admin Credentials
    if (email === "admin@sportify.com" && password === "admin123") {
      const user = {
        id: "u-admin-01",
        name: "Chief Sports Administrator",
        email: "admin@sportify.com",
        role: "ADMIN",
        avatar: "👑",
      };
      const token = generateToken(user);
      return { token, user };
    }

    // Organizer Credentials
    if (email === "organizer@sportify.com" && password === "organizer123") {
      const user = {
        id: "u-org-01",
        name: "League Tournament Manager",
        email: "organizer@sportify.com",
        role: "ORGANIZER",
        avatar: "📋",
      };
      const token = generateToken(user);
      return { token, user };
    }

    // Fan / Public User Credentials
    if (email === "user@sportify.com" && password === "user123") {
      const user = {
        id: "u-fan-01",
        name: "Sports Fan",
        email: "user@sportify.com",
        role: "FAN",
        avatar: "⚽",
      };
      const token = generateToken(user);
      return { token, user };
    }

    // Default registration / guest auth for dev mode
    if (password && password.length >= 6) {
      const user = {
        id: `u-${Date.now()}`,
        name: email.split("@")[0],
        email,
        role: "FAN",
      };
      const token = generateToken(user);
      return { token, user };
    }

    throw new AppError("Invalid email or password", 401);
  }

  static async register(payload: IRegisterPayload): Promise<IAuthResponse> {
    const user = {
      id: `u-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      role: payload.role || "FAN",
    };
    const token = generateToken(user);
    return { token, user };
  }
}
