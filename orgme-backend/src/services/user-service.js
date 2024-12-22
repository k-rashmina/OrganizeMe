const {
  createUser,
  getUser,
  getUserCredentials,
} = require("../data-access/user-db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUserService = async (user) => {
  const saltRounds = 10;

  try {
    const existingUser = await getUserCredentials(user.email);

    if (existingUser) return 409;

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    return await createUser(user);
  } catch (e) {
    console.log(e.message);
  }
};

const userLoginService = async (userCredentails) => {
  try {
    const { _id, email, password } = await getUserCredentials(
      userCredentails.userEmail
    );
    if (!email) {
      return 400;
    }

    if (await bcrypt.compare(userCredentails.userPassword, password)) {
      const accessToken = jwt.sign(
        { _id, email },
        process.env.ACCESS_TOKEN_SECRET
      );
      return accessToken;
    } else {
      return 401;
    }
  } catch (e) {
    console.log(e.message);
    return 500;
  }
};

const getUserService = async (loggedUser) => {
  try {
    const user = await getUser(loggedUser);

    return user;
  } catch (e) {
    console.log(e.message);
    return 500;
  }
};

module.exports = { createUserService, userLoginService, getUserService };
