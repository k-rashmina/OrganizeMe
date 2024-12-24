const {
  createUserService,
  userLoginService,
  getUserService,
  forgotPasswordService,
  resetPasswordService,
  updateUserService,
  changePasswordService,
} = require("../services/user-service");

const frontendPort = process.env.FRONTEND_PORT;
const frontendlink = `http://localhost:${frontendPort}/resetPassword/`;

/**
 * Controller method for get user info.
 * @param {*} req
 * @param {*} res
 */
const getUserController = async (req, res) => {
  try {
    const loggedUser = req.user;

    res.json(await getUserService(loggedUser.email));
  } catch (e) {
    console.log("Error occurred in getUserController: ", e);
    res.status(500).send("Error occurred");
  }
};

/**
 * Controller method for creating new user.
 * @param {*} req
 * @param {*} res
 */
const createUserController = async (req, res) => {
  try {
    const user = req.body;
    const result = await createUserService(user);

    if (result === 409) {
      res.status(result).json({ message: "User already exists" });
      return;
    }

    res.send(result);
  } catch (e) {
    console.log("Error occurred in createUserController: ", e);
    res.status(500).json({ message: "Error occurred" });
  }
};

/**
 * Controller method for user login.
 * @param {*} req
 * @param {*} res
 */
const userLogin = async (req, res) => {
  try {
    const token = await userLoginService(req.body);
    if (token === 400 || token === 401) {
      res.status(token).json({ message: "Invalid credentials" });
      return;
    }

    if (token === 500) {
      res.status(token).json({ message: "Error occurred" });
      return;
    }

    res.json({ accessToken: token });
  } catch (e) {
    console.log("Error occurred in createUserController: ", e);
    res.status(token).json({ message: "Error occurred" });
  }
};

/**
 * Controller method for forgot password.
 * @param {*} req
 * @param {*} res
 */
const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await getUserService(email);

    if (!user)
      return res
        .status(400)
        .json({ message: "No user account for the give email address" });

    const resetUrl = `${frontendlink}`;

    await forgotPasswordService(user, resetUrl);
    res.sendStatus(200);
  } catch (e) {
    console.log("Error occurred in forgotPasswordController: ", e);
    res.status(500).json({ message: "Error occurred" });
  }
};

/**
 * Controller method for reset password.
 * @param {*} req
 * @param {*} res
 */
const resetPasswordController = async (req, res) => {
  try {
    const status = await resetPasswordService(req.params.token, req.body);

    if (status === 400)
      return res
        .status(status)
        .json({ message: "Token invalid or has expired" });

    if (status === 409)
      return res
        .status(status)
        .json({ message: "Password and confirm password does not match" });

    return res.status(status).json({ message: "Password reset successful" });
  } catch (e) {
    console.log("Error occurred in resetPasswordController: ", e);
    res.status(500).json({ message: "Error occurred" });
  }
};

/**
 * Controller method for updating user info.
 * @param {*} req
 * @param {*} res
 */
const updateUserController = async (req, res) => {
  try {
    const user = req.body;

    await updateUserService(user);
    res.sendStatus(200);
  } catch (e) {
    console.log("Error occurred in updateUserController: ", e);
    res.status(500).json({ message: "Error occurred" });
  }
};

const changePasswordController = async (req, res) => {
  const { email } = req.user;
  const { oldPass, newPass } = req.body;

  const status = await changePasswordService(email, oldPass, newPass);

  if (status === 401)
    return res.status(status).json({ message: "Invalid Password" });

  return res.status(status).json({ message: "Password Change Successful" });
};

module.exports = {
  getUserController,
  createUserController,
  userLogin,
  forgotPasswordController,
  resetPasswordController,
  updateUserController,
  changePasswordController,
};
