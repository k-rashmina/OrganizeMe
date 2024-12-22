const {
  createUserService,
  userLoginService,
  getUserService,
} = require("../services/user-service");

/**
 * Controller method for get user info.
 * @param {*} req
 * @param {*} res
 */
const getUserController = async (req, res) => {
  try {
    const loggedUser = req.user;

    res.json(await getUserService(loggedUser));
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
      res.status(result).json({ message: "User Already Exists" });
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
      res.status(token).json({ message: "Invalid Credentials" });
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

module.exports = { getUserController, createUserController, userLogin };
