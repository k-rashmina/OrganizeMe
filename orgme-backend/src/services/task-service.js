const { createTask } = require("../data-access/task-db");

const createTaskService = async (task) => {
  try {
    return await createTask(task);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { createTaskService };
