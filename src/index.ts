import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { sequelize } from "./db";
import routes from "./routes/auth";

dotenv.config();

// Error Handler
export class JSONParseError extends SyntaxError {
  status?: number;
}

const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((err as JSONParseError) instanceof SyntaxError) {
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

const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.json());

// Available Routes
app.use("/api", routes);

app.use(errorHandler);

// Sync the database
(async () => {
  await sequelize.sync({ force: false });
  console.log("Database synced!");
})();

app.listen(process.env.PORT || 5000, () => {
  console.log(`DPDZero-Backend-Task listening on port ${process.env.PORT}`);
});
