const {
  createUser,
  getUser,
  getUserCredentials,
  getUserByResetToken,
  updateUserDetails,
} = require("../data-access/user-db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const ConvertTimeToUTC = require("../utils/dateTimeUtil");
const sendEmail = require("../utils/email");

/**
 * function for creating an encrypted password using bcrypt
 * @param {*} password
 * @returns
 */
const createPasswordHash = async (password) => {
  const saltRounds = 10;

  return await bcrypt.hash(password, saltRounds);
};

/**
 * Service method for registering a user
 * @param {*} user
 * @returns
 */
const createUserService = async (user) => {
  try {
    const existingUser = await getUserCredentials(user.email);

    if (existingUser) return 409;

    user.password = await createPasswordHash(user.password);

    return await createUser(user);
  } catch (e) {
    console.log(e.message);
  }
};

/**
 * Service method for logging in a user
 * @param {*} userCredentails
 * @returns
 */
const userLoginService = async (userCredentails) => {
  try {
    const user = await getUserCredentials(userCredentails.userEmail);

    if (!user) {
      return 400;
    }

    const { _id, email } = user;

    if (await bcrypt.compare(userCredentails.userPassword, user.password)) {
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

/**
 * Service method for getting the logged user
 * @param {*} loggedUser
 * @returns
 */
const getUserService = async (loggedUser) => {
  try {
    const user = await getUser(loggedUser);

    return user;
  } catch (e) {
    console.log(e.message);
    return 500;
  }
};

/**
 * Service method for handling forgot password feature
 * @param {*} user
 * @param {*} resetUrl
 * @returns
 */
const forgotPasswordService = async (user, resetUrl) => {
  try {
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpires = ConvertTimeToUTC(Date.now() + 10 * 60 * 1000);

    await updateUserDetails(user);

    // console.log("resetToken", resetToken);
    // console.log("resetPasswordToken", user.resetPasswordToken);

    //creating email options for sending password reset email

    const message = `
          <p>Hi ${user.firstName},</p>
          <p>We received a request to reset your password for your OrganizeMe account. If you made this request, please click the link below to reset your password:</p><br>
          <a href="${resetUrl}${resetToken}">${resetUrl}${resetToken}</a><br><br>
          <p>For security purposes, this link will expire in 10 minutes. If you did not request a password reset, you can safely ignore this email—your password will remain unchanged.</p>
          <p>If you have any questions or need further assistance, feel free to contact our support team at <strong>${process.env.EMAIL_USER}</strong>.</p>
          <p>Thank you,<br><strong>OrganizeMe Team</strong></p>
      `;
    const subject = "Reset Your Password for OrganizeMe";

    await sendEmail({
      email: user.email,
      message,
      subject,
    });

    return resetToken;
  } catch (e) {
    console.log(e.message);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await updateUserDetails(user);
  }
};

/**
 * Service method for resetting the password
 * @param {*} token
 * @param {*} passwords
 * @returns
 */
const resetPasswordService = async (token, passwords) => {
  try {
    const encrptToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await getUserByResetToken(encrptToken);

    if (!user) return 400;

    if (passwords.pass !== passwords.confirmPass) return 409;

    user.password = await createPasswordHash(passwords.pass);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await updateUserDetails(user);
    return 200;
  } catch (e) {
    console.log(e.message);
  }
};

/**
 * Service method for updating a user
 * @param {*} user
 * @returns
 */
const updateUserService = async (user) => {
  try {
    return await updateUserDetails(user);

    return up;
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  createUserService,
  userLoginService,
  getUserService,
  forgotPasswordService,
  resetPasswordService,
  updateUserService,
};
