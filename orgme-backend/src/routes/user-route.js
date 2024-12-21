const express = require("express");
const { getuser } = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getuser);

module.exports = router;
