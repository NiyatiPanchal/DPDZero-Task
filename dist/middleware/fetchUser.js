"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchuser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const customErrors_1 = require("../utils/customErrors");
dotenv_1.default.config();
const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const { authorization } = req.headers;
    // const token = req.header("authorization");
    // console.log(token);
    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new customErrors_1.InvalidInput({
            message: "Invalid access token provided",
            code: "INVALID_TOKEN",
        }, 401);
    }
    const token = authorization.replace("Bearer ", "");
    console.log(token);
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ", data);
        // req.user = data.user;
        next();
    }
    catch (error) {
        throw new customErrors_1.InvalidInput({
            message: "Invalid access token provided",
            code: "INVALID_TOKEN",
        }, 401);
    }
};
exports.fetchuser = fetchuser;
