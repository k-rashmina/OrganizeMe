const mongoose = require("mongoose");
const User = require("../models/user-model");
const ConvertTimeToUTC = require("../utils/dateTimeUtil");

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

//function for getting a user by email
const getUser = async (loggedUser) => {
  try {
    const user = await User.findOne({ email: loggedUser });

    return user || null;
  } catch (err) {
    console.log(err.message);
  }
};

//function for getting a user credentials
const getUserCredentials = async (userEmail) => {
  try {
    const userCred = await User.findOne({ email: userEmail }, "email").select(
      "+password"
    );

    return userCred || null;
  } catch (err) {
    console.log(err.message);
  }
};

//function for getting a user by reset password token
const getUserByResetToken = async (token) => {
  try {
    return await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: ConvertTimeToUTC(Date.now()) },
    });
  } catch (err) {
    console.log(err.message);
  }
};

//function for getting a user credentials
const updateUserDetails = async (user) => {
  try {
    return await User.findOneAndUpdate(user);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  createUser,
  getUser,
  getUserCredentials,
  getUserByResetToken,
  updateUserDetails,
};
