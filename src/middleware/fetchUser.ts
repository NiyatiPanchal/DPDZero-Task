import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { InvalidInput } from "../utils/customErrors";
dotenv.config();

export const fetchuser = (req: Request, res: Response, next: any) => {
  // User Authorization
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new InvalidInput(
      {
        message: "Invalid access token provided",
        code: "INVALID_TOKEN",
      },
      401
    );
  }
  const token = authorization.replace("Bearer ", "");

  try {
    // Verify User
    const data = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (error) {
    throw new InvalidInput(
      {
        message: "Invalid access token provided",
        code: "INVALID_TOKEN",
      },
      401
    );
  }
};
