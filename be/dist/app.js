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
app.use((0, cors_1.default)({
    origin: "*",
    credentials: false,
}));
app.use(express_1.default.json());
app.use("/api", index_1.default);
const mongoURI = process.env.MONGODB_URI_PROD || "mongodb://localhost:27017/todo";
const PORT = process.env.PORT || 5555;
mongoose_1.default
    .connect(mongoURI)
    .then(() => {
    console.log("mongoose connected");
})
    .catch((err) => {
    console.log("DB connection fail", err);
});
app.listen(PORT, () => {
    console.log("server on 5555");
});
