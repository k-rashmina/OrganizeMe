const {
  createTaskService,
  getAllTasksService,
  updateTaskService,
  deleteTaskService,
} = require("../services/task-service");

/**
 * Controller method for get tasks list.
 * @param {*} req
 * @param {*} res
 */
const getAllTasksController = async (req, res) => {
  try {
    const userID = req.user._id;
    const searchParams = {
      sortBy: req.query.sortBy,
      sort: req.query.sort,
      priority: req.query.priority,
    };

    res.json(await getAllTasksService(userID, searchParams));
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
    const userID = req.user._id;
    const task = req.body;
    task.userId = userID;
    const result = await createTaskService(task);

    res.send(result);
  } catch (e) {
    console.log("Error occurred in createTaskController: ", e);
    res.status(500).send("Error occurred");
  }
};

/**
 * Controller method for updating task.
 * @param {*} req
 * @param {*} res
 */
const updateTaskController = async (req, res) => {
  try {
    const task = req.body;
    const updatedTask = await updateTaskService(task);

    res.json(updatedTask);
  } catch (e) {
    console.log("Error occurred in updateTaskController: ", e);
    res.status(500).send("Error occurred");
  }
};

/**
 * Controller method for deleting task.
 * @param {*} req
 * @param {*} res
 */
const deleteTaskController = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    await deleteTaskService(taskId);

    res.sendStatus(200);
  } catch (e) {
    console.log("Error occurred in deleteTaskController: ", e);
    res.status(500).send("Error occurred");
  }
};

module.exports = {
  getAllTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
};
