const bcrypt = require("bcrypt");
const connection = require("../db/connection");
const jwt = require("jsonwebtoken");

const generatePassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (_err) {
    return console.error("Bermasalah buat loe!", _err);
  }
};

const comparePassword = async (loginPassword, userPassword) => {
  try {
    const ok = await bcrypt.compare(loginPassword, userPassword);
    return ok;
  } catch (_err) {
    return console.error("Bermasalah di compare password", _err);
  }
};

const generateToken = (getReqBody) => {
  const token = jwt.sign(getReqBody, process.env.JWT_TOKEN);
  return token;
};

const similarAccount = async (getRegsiter) =>
  new Promise((resolve, reject) => {
    connection.execute(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [getRegsiter.email],
      (_err, rows) => {
        if (_err) reject(_err);
        resolve(rows);
      },
    );
  });

const matchmaking = async (getLogin) =>
  new Promise((resolve, reject) => {
    connection.execute(
      "SELECT id, email, password FROM users WHERE email = ? LIMIT 1",
      [getLogin.email],
      (_err, rows) => {
        if (_err) reject(_err);
        resolve(rows);
      },
    );
  });

module.exports = {
  generatePassword,
  comparePassword,
  generateToken,
  similarAccount,
  matchmaking,
};
