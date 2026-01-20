const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const smtp = nodemailer.createTransport({
  host: process.env.MAILER_SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.MAILER_SMTP_USER,
    pass: process.env.MAILER_SMTP_PASS,
  },
});

const now = () => new Date().toLocaleString();

const mail = async (email, token) => {
  try {
    console.log(`${now()} - Preparing to send email...`);

    const link = `http://localhost:3000/users/verify-email?token=${token}`;

    await smtp.sendMail({
      from: process.env.MAILER_DEFAULT_SENDER_EMAIL,
      to: email,
      subject: "Verifikasi email",
      text: `Klik link berikut untuk verifikasi email anda: ${link}`,
      html: `Klik link berikut untuk verifikasi email anda: <a href=${link}>Verifikasi Email</a>`,
    });

    console.log(`${now()} - Email send successfully`);
  } catch (_err) {
    console.error("Terjadi masalah di nodemailer", _err);
  }
};

module.exports = { mail };
