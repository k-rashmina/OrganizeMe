const express = require("express");
const {
  getUserController,
  createUserController,
  userLogin,
  forgotPasswordController,
  resetPasswordController,
  updateUserController,
  changePasswordController,
} = require("../controllers/user-controller");
const authenticateToken = require("../middleware/authenticate-token");

const router = express.Router();

router.get("/", authenticateToken, getUserController);
router.post("/register", createUserController);
router.post("/login", userLogin);
router.post("/forgotPassword", forgotPasswordController);
router.patch("/resetPassword/:token", resetPasswordController);
router.put("/", updateUserController);
router.put("/changePassword", authenticateToken, changePasswordController);

module.exports = router;
