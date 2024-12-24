const mongoose = require("mongoose");
const ConvertTimeToUTC = require("../utils/dateTimeUtil");

const Schema = mongoose.Schema;

//Schema for the task
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "users",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  create_date: {
    type: Date,
    default: () => ConvertTimeToUTC(Date.now()),
    immutable: true,
  },
  update_date: {
    type: Date,
    default: () => ConvertTimeToUTC(Date.now()),
  },
});

const Task = mongoose.model("tasks", taskSchema);
module.exports = Task;
