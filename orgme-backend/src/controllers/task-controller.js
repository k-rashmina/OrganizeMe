/**
 * Controller method for get tasks list.
 * @param {*} req
 * @param {*} res
 */
const getAllTasks = async (req, res) => {
  try {
    res.send("This is the tasks controller");
  } catch (e) {
    console.log("Error occurred in getAllTasks: ", e);
    res.status(500).send("Error occurred");
  }
};

module.exports = { getAllTasks };
