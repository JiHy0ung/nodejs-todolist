import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    task: { type: String, required: true },
    isComplete: { type: Boolean, required: true },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
