"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// CORS 설정
app.use((0, cors_1.default)({
    origin: "*",
    credentials: false,
}));
app.use(express_1.default.json());
// Health check
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});
app.use("/api", index_1.default);
const mongoURI = process.env.MONGODB_URI_PROD || "mongodb://localhost:27017/todo";
const PORT = process.env.PORT || 5555;
// 서버 시작
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
// MongoDB 연결
mongoose_1.default
    .connect(mongoURI)
    .then(() => {
    console.log("MongoDB connected successfully");
})
    .catch((err) => {
    console.error("DB connection failed:", err.message);
});
// 에러 핸들링
mongoose_1.default.connection.on("error", (err) => {
    console.error("MongoDB error:", err);
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});
// Graceful shutdown
process.on("SIGTERM", () => {
    console.log("SIGTERM received, closing server...");
    server.close(() => {
        mongoose_1.default.connection.close();
        process.exit(0);
    });
});
