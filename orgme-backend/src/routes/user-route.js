const express = require("express");
const {
  getUserController,
  createUserController,
  userLogin,
} = require("../controllers/user-controller");
const authenticateToken = require("../middleware/authenticate-token");

const router = express.Router();

router.get("/", authenticateToken, getUserController);
router.post("/register", createUserController);
router.post("/login", userLogin);

module.exports = router;
