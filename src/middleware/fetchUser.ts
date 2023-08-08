import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { InvalidInput } from "../utils/customErrors";
dotenv.config();

export const fetchuser = (req: Request, res: Response, next: any) => {
  // Get the user from the jwt token and add id to req object
  const { authorization } = req.headers;
  // const token = req.header("authorization");
  // console.log(token);

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
  console.log(token);

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ", data);

    // req.user = data.user;
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
