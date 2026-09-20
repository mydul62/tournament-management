import { AppError } from "../../utils/app-error";
import { generateToken } from "../../utils/jwt";
import { ILoginPayload, IRegisterPayload, IAuthResponse } from "./auth.interface";

export class AuthService {
  static async login(payload: ILoginPayload): Promise<IAuthResponse> {
    // In production, query Prisma user table and compare bcrypt password
    if (payload.email === "admin@sportify.com" && payload.password === "admin123") {
      const user = { id: "u-admin", name: "System Admin", email: payload.email, role: "ADMIN" };
      const token = generateToken(user);
      return { token, user };
    }

    const user = { id: `u-${Date.now()}`, name: payload.email.split("@")[0], email: payload.email, role: "ORGANIZER" };
    const token = generateToken(user);
    return { token, user };
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
