const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../data-access/task-db");

/**
 * Service method for creating task
 * @param {*} task
 * @returns
 */
const createTaskService = async (task) => {
  try {
    return await createTask(task);
  } catch (e) {
    console.log(e.message);
  }
};

/**
 * Service method for getting all tasks
 * @param {*} userID
 * @param {*} searchParams
 * @returns
 */
const getAllTasksService = async (userID, searchParams) => {
  try {
    searchParams.sort = parseInt(searchParams.sort);
    // console.log("userID", userID);
    // console.log("searchParams", searchParams);
    return await getAllTasks(userID, searchParams);
  } catch (e) {
    console.log(e.message);
  }
};

/**
 * Service method for updating a task
 * @param {*} task
 * @returns
 */
const updateTaskService = async (task) => {
  try {
    return await updateTask(task);
  } catch (e) {
    console.log(e.message);
  }
};

/**
 * Service method for deleting a task
 * @param {*} taskId
 * @returns
 */
const deleteTaskService = async (taskId) => {
  try {
    return await deleteTask(taskId);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  createTaskService,
  getAllTasksService,
  updateTaskService,
  deleteTaskService,
};
