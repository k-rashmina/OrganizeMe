const { createTaskService } = require("../services/task-service");

/**
 * Controller method for get tasks list.
 * @param {*} req
 * @param {*} res
 */
const getAllTasksController = async (req, res) => {
  try {
    res.send("This is the tasks controller");
  } catch (e) {
    console.log("Error occurred in getAllTasksController: ", e);
    res.status(500).send("Error occurred");
  }
};

/**
 * Controller method for post task.
 * @param {*} req
 * @param {*} res
 */
const createTaskController = async (req, res) => {
  try {
    const task = req.body;
    const result = await createTaskService(task);

    res.send(result);
  } catch (e) {
    console.log("Error occurred in createTaskController: ", e);
    res.status(500).send("Error occurred");
  }
};

module.exports = { getAllTasksController, createTaskController };
