import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { InvalidInput } from "../utils/customErrors";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Validation Errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = errors.array().map((e) => ({
        ...e.msg,
      }));
      throw new InvalidInput(err[0]);
    }

    const { username, email } = req.body;

    const [existingUsername, existingEmail] = await Promise.all([
      User.findOne({
        where: { username },
      }),
      User.findOne({
        where: { email },
      }),
    ]);

    // Check if the username is already taken
    if (existingUsername) {
      throw new InvalidInput({
        message:
          "The provided username is already taken. Please choose a different username.",
        code: "USERNAME_EXISTS",
      });
    }

    // Check if the email is already taken
    if (existingEmail) {
      throw new InvalidInput({
        message:
          "The provided email is already registered. Please use a different email address.",
        code: "EMAIL_EXISTS",
      });
    }

    // Create a new user in the database
    const newUser = await User.create({ ...req.body });

    return res.status(201).json({
      status: "success",
      message: "User successfully registered!",
      data: {
        user_id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        full_name: newUser.full_name,
        age: newUser.age,
        gender: newUser.gender,
      },
    });
  } catch (error: any) {
    if (error instanceof InvalidInput) {
      next(error);
    } else {
      throw new InvalidInput(
        {
          message: "Internal server error occurred. Please try again later.",
          code: "INTERNAL_ERROR",
        },
        500
      );
    }
  }
}

export async function generateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Validation Errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = errors.array().map((e) => ({
        ...e.msg,
      }));
      throw new InvalidInput(err[0]);
    }

    const { username, password } = req.body;

    // Check if the username exists and the provided password matches
    const user = await User.findOne({
      where: { username },
    });

    if (!user || user.password !== password) {
      throw new InvalidInput({
        message:
          "Invalid credentials. The provided username or password is incorrect.",
        code: "INVALID_CREDENTIALS",
      });
    }

    // Generate Token
    const authToken = jwt.sign({ username }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: "success",
      message: "Access token generated successfully.",
      data: {
        access_token: authToken,
        expires_in: 3600,
      },
    });
  } catch (error: any) {
    if (error instanceof InvalidInput) {
      next(error);
    } else {
      throw new InvalidInput(
        {
          message: "Internal server error occurred. Please try again later.",
          code: "INTERNAL_ERROR",
        },
        500
      );
    }
  }
}
