import express from "express";
import taskApi from "./task.api";
const router = express.Router();

router.use("/tasks", taskApi);

export default router;
