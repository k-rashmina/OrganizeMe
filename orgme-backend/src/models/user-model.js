const mongoose = require("mongoose");
const ConvertTimeToUTC = require("../utils/dateTimeUtil");

const Schema = mongoose.Schema;

//Schema for the user
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  resetPasswordToken: {
    type: String,
    required: false,
  },
  resetPasswordExpires: {
    type: Date,
    required: false,
  },
  create_date: {
    type: Date,
    default: () => ConvertTimeToUTC(Date.now()),
    immutable: true,
  },
  update_date: {
    type: Date,
    default: () => ConvertTimeToUTC(Date.now()),
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
