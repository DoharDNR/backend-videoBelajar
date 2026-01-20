const connection = require("../db/connection");

const findToken = async (token) =>
  new Promise((resolve, reject) => {
    connection.query(
      "SELECT verify_token FROM users WHERE verify_token = ?",
      [token],
      (_err, rows) => {
        if (_err) reject(_err);
        resolve(rows);
      },
    );
  });

const deleteToken = async () =>
  new Promise((resolve, reject) => {
    connection.query("UPDATE users SET verify_token = null", (_err, row) => {
      if (_err) reject(_err);
      resolve(row);
    });
  });

const verifyToken = async (token) => {
  try {
    const user = await findToken(token);
    return user;
  } catch (_err) {
    return Error("Terjadi masalah di helper.verifyEmail", _err);
  }
};

module.exports = { verifyToken, deleteToken };
