const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    // Set up nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: options.email,
      subject: options.subject,
      html: options.message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {}
};

module.exports = sendEmail;
