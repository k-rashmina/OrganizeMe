const {
  createUser,
  getUser,
  getUserCredentials,
  updateUserDetails,
} = require("../data-access/user-db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const ConvertTimeToUTC = require("../utils/dateTimeUtil");
const sendEmail = require("../utils/email");

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
          <p>We received a request to reset your password for your OrganizeMe account. If you made this request, please click the link below to reset your password:</p><br><br>
          <a href="${resetUrl}${resetToken}">${resetUrl}${resetToken}</a><br><br>
          <p>For security purposes, this link will expire in 10 minutes. If you did not request a password reset, you can safely ignore this email—your password will remain unchanged.</p>
          <p>If you have any questions or need further assistance, feel free to contact our support team at <strong>${process.env.EMAIL_USER}</strong>.</p>
          <p>Thank you,<br><strong>The OrganizeMe Team</strong></p>
      `;
    const subject = "Subject: Reset Your Password for OrganizeMe";

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

const resetPasswordService = async (user) => {
  try {
  } catch (e) {
    console.log(e.message);
  }
};

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
