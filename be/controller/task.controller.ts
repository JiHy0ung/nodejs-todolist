import { Request, Response } from "express";
import Task from "../model/Task";

const taskController = {
  async createTask(req: Request, res: Response) {
    try {
      const { task, isComplete } = req.body;
      const newTask = new Task({ task, isComplete });

      await newTask.save();

      res.status(200).json({ status: "ok", data: newTask });
    } catch (err: any) {
      res.status(400).json({ status: "fail", error: err.message });
    }
  },

  async getTask(req: Request, res: Response) {
    try {
      const taskList = await Task.find({}).select("-__v");
      res.status(200).json({ status: "ok", data: taskList });
    } catch (err: any) {
      res.status(400).json({ status: "fail", error: err.message });
    }
  },

  async updateTask(req: Request, res: Response) {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true },
      );

      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ status: "ok", data: updatedTask });
    } catch (err: any) {
      res.status(400).json({ status: "fail", error: err.message });
    }
  },

  async deleteTask(req: Request, res: Response) {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      res.status(200).json({ status: "ok", data: deletedTask });
    } catch (err: any) {
      res.status(400).json({ status: "fail", error: err.message });
    }
  },
};

export default taskController;
