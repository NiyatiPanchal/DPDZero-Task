"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize Sequelize
exports.sequelize = new sequelize_typescript_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: process.env.DB_HOST,
});
exports.sequelize.addModels([__dirname + "/models/"]);
//sequelize.addModels([User]);