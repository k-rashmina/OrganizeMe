const mongoose = require("mongoose");
const User = require("../models/user-model");

//function for creating accounts for new users
const createUser = async (user) => {
  try {
    const newUser = new User(user);

    //saving the user details in the db
    await newUser.save();

    return true;
  } catch (err) {
    console.log(err.message);
  }
};

//function for getting a user
const getUser = async (loggedUser) => {
  try {
    const user = await User.findOne({ email: loggedUser.email });

    return user || null;
  } catch (err) {
    console.log(err.message);
  }
};

//function for getting a user credentials
const getUserCredentials = async (userEmail) => {
  try {
    const userCred = await User.findOne({ email: userEmail }, "email password");

    return userCred || null;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  createUser,
  getUser,
  getUserCredentials,
};
