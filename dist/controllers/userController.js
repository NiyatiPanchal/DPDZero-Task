"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.registerUser = void 0;
const express_validator_1 = require("express-validator");
const customErrors_1 = require("../utils/customErrors");
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function registerUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            console.log(errors);
            if (!errors.isEmpty()) {
                const err = errors.array().map((e) => (Object.assign({}, e.msg)));
                throw new customErrors_1.InvalidInput(err[0]);
            }
            const { username, email } = req.body;
            //   Check if the username is already taken
            const [existingUsername, existingEmail] = yield Promise.all([
                User_1.User.findOne({
                    where: { username },
                }),
                User_1.User.findOne({
                    where: { email },
                }),
            ]);
            if (existingUsername) {
                throw new customErrors_1.InvalidInput({
                    message: "The provided username is already taken. Please choose a different username.",
                    code: "USERNAME_EXISTS",
                });
            }
            if (existingEmail) {
                throw new customErrors_1.InvalidInput({
                    message: "The provided email is already registered. Please use a different email address.",
                    code: "EMAIL_EXISTS",
                });
            }
            // Create a new user in the database
            const newUser = yield User_1.User.create(Object.assign({}, req.body));
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
        }
        catch (error) {
            if (error instanceof customErrors_1.InvalidInput) {
                next(error);
            }
            else {
                throw new customErrors_1.InvalidInput({
                    message: "Internal server error occurred. Please try again later.",
                    code: "INTERNAL_ERROR",
                }, 500);
            }
        }
    });
}
exports.registerUser = registerUser;
function generateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                const err = errors.array().map((e) => (Object.assign({}, e.msg)));
                throw new customErrors_1.InvalidInput(err[0]);
            }
            const { username, password } = req.body;
            // Check if the username exists and the provided password matches
            const user = yield User_1.User.findOne({
                where: { username },
            });
            if (!user || user.password !== password) {
                throw new customErrors_1.InvalidInput({
                    message: "Invalid credentials. The provided username or password is incorrect.",
                    code: "INVALID_CREDENTIALS",
                });
            }
            const authToken = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET, {
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
        }
        catch (error) {
            if (error instanceof customErrors_1.InvalidInput) {
                next(error);
            }
            else {
                throw new customErrors_1.InvalidInput({
                    message: "Internal server error occurred. Please try again later.",
                    code: "INTERNAL_ERROR",
                }, 500);
            }
        }
    });
}
exports.generateToken = generateToken;
