const express = require("express");
const {
  getAllTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../controllers/task-controller");
const authenticateToken = require("../middleware/authenticate-token");

const router = express.Router();

router.get("/", authenticateToken, getAllTasksController);
router.post("/", createTaskController);
router.put("/", updateTaskController);
router.delete("/:taskId", deleteTaskController);

module.exports = router;
