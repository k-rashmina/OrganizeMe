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

module.exports = {
  createTask,
};
