import express from "express";
import taskController from "../controller/task.controller";
const router = express.Router();

router.post("/", taskController.createTask);

router.get("/", taskController.getTask);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

export default router;
