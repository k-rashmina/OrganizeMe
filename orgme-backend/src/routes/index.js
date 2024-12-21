const express = require("express");
const userRoute = require("./user-route");
const taskRoute = require("./task-route");

const router = express.Router();

router.use("/user", userRoute);
router.use("/task", taskRoute);

module.exports = router;
