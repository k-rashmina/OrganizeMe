const express = require("express");
const {
  getAllTasksController,
  createTaskController,
} = require("../controllers/task-controller");

const router = express.Router();

router.get("/", getAllTasksController);
router.post("/", createTaskController);

module.exports = router;
