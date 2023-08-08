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
exports.JSONParseError = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
class JSONParseError extends SyntaxError {
}
exports.JSONParseError = JSONParseError;
const errorHandler = (err, req, res, next // don't remove this
) => {
    if (err instanceof SyntaxError) {
        err.httpStatusCode = 400;
        console.log("JSON error:" + err.message);
        err.message = `Invalid JSON string in request.`;
    }
    if (!err.httpStatusCode) {
        err.httpStatusCode = 500;
    }
    res.status(err.httpStatusCode).json({
        status: err.status,
        code: err.code,
        message: err.message,
    });
};
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
// Available Routes
app.use("/api", auth_1.default);
app.use(errorHandler);
// Sync the database
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.sequelize.sync();
    console.log("Database synced!");
}))();
app.listen(process.env.PORT || 5000, () => {
    console.log(`DPDZero-Backend-Task listening on port ${process.env.PORT}`);
});
