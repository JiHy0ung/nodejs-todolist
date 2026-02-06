"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = __importDefault(require("../controller/task.controller"));
const router = express_1.default.Router();
router.post("/", task_controller_1.default.createTask);
router.get("/", task_controller_1.default.getTask);
router.put("/:id", task_controller_1.default.updateTask);
router.delete("/:id", task_controller_1.default.deleteTask);
exports.default = router;
