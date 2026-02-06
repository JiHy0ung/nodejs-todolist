import express from "express";
import mongoose from "mongoose";
import indexRouter from "./routes/index";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS 설정
app.use(
  cors({
    origin: "*",
    credentials: false,
  }),
);

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", indexRouter);

const mongoURI =
  process.env.MONGODB_URI_PROD || "mongodb://localhost:27017/todo";
const PORT = process.env.PORT || 5555;

// 서버 시작
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
});

// MongoDB 연결
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
  });

// 에러 핸들링
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️  MongoDB disconnected");
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, closing server...");
  server.close(() => {
    mongoose.connection.close();
    process.exit(0);
  });
});
