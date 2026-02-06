import express from "express";
import mongoose from "mongoose";
import indexRouter from "./routes/index";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", indexRouter);

const mongoURI =
  process.env.MONGODB_URI_PROD || "mongodb://localhost:27017/todo";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

app.listen(process.env.MONGODB_URI_PROD || 5555, () => {
  console.log("server on 5555");
});
