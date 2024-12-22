const mongoose = require("mongoose");
const Task = require("../models/task-model");

//function for creating tasks for users
const createTask = async (task) => {
  try {
    const newTask = new Task(task);

    //saving the task details in the db
    await newTask.save();

    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

//function for getting all tasks for users
const getAllTasks = async (userID, searchParams) => {
  try {
    const { sortBy, sort, priority } = searchParams;

    //getting tasks from the db if priority is specified
    if (priority) {
      return await Task.find({
        userId: userID,
        priority: priority,
        isCompleted: false,
      }).sort({
        [sortBy]: sort,
      });
    }

    return await Task.find({ userId: userID, isCompleted: false }).sort({
      [sortBy]: sort,
    });
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

//function for updating task details
const updateTask = async (task) => {
  try {
    //updating the task details in the db
    return await Task.findByIdAndUpdate(task._id, task, { new: true });
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

//function for deleting a task
const deleteTask = async (taskId) => {
  try {
    //deleting the task details from the db
    return await Task.findByIdAndDelete(taskId);
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
