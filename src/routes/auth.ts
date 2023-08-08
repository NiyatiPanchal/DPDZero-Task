import express from "express";
import { body } from "express-validator";
import dotenv from "dotenv";
import { fetchuser } from "../middleware/fetchUser";
import { generateToken, registerUser } from "../controllers/userController";
import {
  addData,
  deleteData,
  getData,
  updateData,
} from "../controllers/dataController";

const router = express.Router();
dotenv.config();

// Register User
router.post(
  "/register",
  [
    body(["username", "email", "password", "full_name", "age", "gender"], {
      message:
        "Invalid request. Please provide all required fields: username, email, password, full_name.",
      code: "INVALID_REQUEST",
    }).notEmpty(),
    body("password", {
      message:
        "The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.",
      code: "INVALID_PASSWORD",
    })
      .notEmpty()
      .isLength({ min: 8 })
      .matches(/[a-z]/)
      .matches(/[A-Z]/)
      .matches(/[0-9]/)
      .matches(/[@$!%*?&]/),
    body("age", {
      message: "Invalid age value. Age must be a positive integer.",
      code: "INVALID_AGE",
    }).isInt({ min: 1 }),
    body("gender", {
      message:
        "Gender field is required. Please specify the gender (e.g., male, female, non-binary).",
      code: "GENDER_REQUIRED",
    }).notEmpty(),
  ],
  registerUser
);

// Generate Token
router.post(
  "/token",
  [
    body(["username", "password"], {
      message: "Missing fields. Please provide both username and password.",
      code: "MISSING_FIELDS",
    }).notEmpty(),
  ],
  generateToken
);

// Add Data
router.post("/data", fetchuser, addData);

// Fetch Data
router.get("/data/:key", fetchuser, getData);

// Update Data
router.put("/data/:key", fetchuser, updateData);

// Delete Data
router.delete("/data/:key", fetchuser, deleteData);

export default router;
