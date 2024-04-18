// Import necessary modules
import mongoose from "mongoose";

// Define the task schema
const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Create the task model
const Task = mongoose.model("Task", taskSchema);

// Export the task model
export default Task;
