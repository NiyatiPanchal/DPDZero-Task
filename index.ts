import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { sequelize } from "./db";

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.json());

// Available Routes
// app.post("/identify", identify);

// Sync the database
(async () => {
  await sequelize.sync({ force: true });
  console.log("Database synced!");
})();

app.listen(process.env.PORT || 5000, () => {
  console.log(`DPDZero-Backend-Task listening on port ${process.env.PORT}`);
});
