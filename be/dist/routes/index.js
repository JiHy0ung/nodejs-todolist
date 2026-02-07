"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_api_1 = __importDefault(require("./task.api"));
const user_api_1 = __importDefault(require("./user.api"));
const router = express_1.default.Router();
router.use("/tasks", task_api_1.default);
router.use("/user", user_api_1.default);
exports.default = router;
