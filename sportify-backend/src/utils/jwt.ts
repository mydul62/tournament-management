import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { config } from "../config/env";

export const generateToken = (payload: object): string => {
  const options: SignOptions = {
    expiresIn: config.jwtExpiresIn as jwt.SignOptions["expiresIn"],
  };
  return jwt.sign(payload, config.jwtSecret as Secret, options);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, config.jwtSecret as Secret);
};
