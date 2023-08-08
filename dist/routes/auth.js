"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const dotenv_1 = __importDefault(require("dotenv"));
const fetchUser_1 = require("../middleware/fetchUser");
const userController_1 = require("../controllers/userController");
const dataController_1 = require("../controllers/dataController");
const router = express_1.default.Router();
dotenv_1.default.config();
router.post("/register", [
    (0, express_validator_1.body)(["username", "email", "password", "full_name", "age", "gender"], {
        message: "Invalid request. Please provide all required fields: username, email, password, full_name.",
        code: "INVALID_REQUEST",
    }).notEmpty(),
    (0, express_validator_1.body)("password", {
        message: "The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.",
        code: "INVALID_PASSWORD",
    })
        .notEmpty()
        .isLength({ min: 8 })
        .matches(/[a-z]/)
        .matches(/[A-Z]/)
        .matches(/[0-9]/)
        .matches(/[@$!%*?&]/),
    (0, express_validator_1.body)("age", {
        message: "Invalid age value. Age must be a positive integer.",
        code: "INVALID_AGE",
    }).isInt({ min: 1 }),
    (0, express_validator_1.body)("gender", {
        message: "Gender field is required. Please specify the gender (e.g., male, female, non-binary).",
        code: "GENDER_REQUIRED",
    }).notEmpty(),
], userController_1.registerUser);
router.post("/token", [
    (0, express_validator_1.body)(["username", "password"], {
        message: "Missing fields. Please provide both username and password.",
        code: "MISSING_FIELDS",
    }).notEmpty(),
], userController_1.generateToken);
router.post("/data", fetchUser_1.fetchuser, dataController_1.addData);
router.get("/data/:key", fetchUser_1.fetchuser, dataController_1.getData);
router.put("/data/:key", fetchUser_1.fetchuser, dataController_1.updateData);
router.delete("/data/:key", fetchUser_1.fetchuser, dataController_1.deleteData);
exports.default = router;
