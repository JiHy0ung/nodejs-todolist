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
const Task_1 = __importDefault(require("../model/Task"));
const taskController = {
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { task, isComplete } = req.body;
                const newTask = new Task_1.default({ task, isComplete });
                yield newTask.save();
                res.status(200).json({ status: "ok", data: newTask });
            }
            catch (err) {
                res.status(400).json({ status: "fail", error: err.message });
            }
        });
    },
    getTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskList = yield Task_1.default.find({}).select("-__v");
                res.status(200).json({ status: "ok", data: taskList });
            }
            catch (err) {
                res.status(400).json({ status: "fail", error: err.message });
            }
        });
    },
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTask = yield Task_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
                if (!updatedTask) {
                    return res.status(404).json({ message: "Task not found" });
                }
                res.status(200).json({ status: "ok", data: updatedTask });
            }
            catch (err) {
                res.status(400).json({ status: "fail", error: err.message });
            }
        });
    },
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedTask = yield Task_1.default.findByIdAndDelete(req.params.id);
                res.status(200).json({ status: "ok", data: deletedTask });
            }
            catch (err) {
                res.status(400).json({ status: "fail", error: err.message });
            }
        });
    },
};
exports.default = taskController;
