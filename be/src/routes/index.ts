import express from "express";
import taskApi from "./task.api";
import userApi from "./user.api";

const router = express.Router();

router.use("/tasks", taskApi);
router.use("/user", userApi);

export default router;
