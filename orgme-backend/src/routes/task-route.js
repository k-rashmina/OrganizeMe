const express = require("express");
const { getAllTasks } = require("../controllers/task-controller");

const router = express.Router();

router.get("/", getAllTasks);

module.exports = router;
