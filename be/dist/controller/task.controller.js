"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = __importDefault(require("../model/Task"));
const taskController = {
    async createTask(req, res) {
        try {
            const { task, isComplete } = req.body;
            const newTask = new Task_1.default({ task, isComplete });
            await newTask.save();
            res.status(200).json({ status: "ok", data: newTask });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ status: "fail", error: err.message });
            }
            else {
                res.status(400).json({ status: "fail", error: "Unknown error" });
            }
        }
    },
    async getTask(req, res) {
        try {
            const taskList = await Task_1.default.find({}).select("-__v");
            res.status(200).json({ status: "ok", data: taskList });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ status: "fail", error: err.message });
            }
            else {
                res.status(400).json({ status: "fail", error: "Unknown error" });
            }
        }
    },
    async updateTask(req, res) {
        try {
            const updatedTask = await Task_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!updatedTask) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.status(200).json({ status: "ok", data: updatedTask });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ status: "fail", error: err.message });
            }
            else {
                res.status(400).json({ status: "fail", error: "Unknown error" });
            }
        }
    },
    async deleteTask(req, res) {
        try {
            const deletedTask = await Task_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json({ status: "ok", data: deletedTask });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ status: "fail", error: err.message });
            }
            else {
                res.status(400).json({ status: "fail", error: "Unknown error" });
            }
        }
    },
};
exports.default = taskController;
