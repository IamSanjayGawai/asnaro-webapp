import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import db_connect_mongo from "./db-connections/mongoconnect";
import { connectSQLDatabase } from "./db-connections/mysqlconnect";
import migrationRoutes from "./routes";
dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "130mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));

app.use("/migration", migrationRoutes);

const port = process.env.PORT || 8000;
const appStart = async () => {
  try {
    server.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
    connectSQLDatabase().then(() => {
      console.log("MySQL connected");
    });
    db_connect_mongo(process.env.MONGO_URI as string);
  } catch (error) {
    console.log("error", error);
  }
};

appStart();
