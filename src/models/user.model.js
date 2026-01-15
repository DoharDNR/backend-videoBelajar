const connection = require("../db/connection");

const createUser = async (firstName, lastName, email, password) =>
  new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO users VALUE (?,?,?,?,?)",
      [crypto.randomUUID(), firstName, lastName, email, password],
      (_err, rows) => {
        if (_err) reject(_err);
        resolve(rows);
      }
    );
  });

const getAllUsers = async () =>
  new Promise((resolve, reject) => {
    connection.query("SELECT * FROM users", (_err, rows) => {
      if (_err) reject(_err);
      resolve(rows);
    });
  });

const getOneUsers = async (id) =>
  new Promise((resolve, reject) => {
    connection.query("SELECT * FROM users WHERE id = ?", [id], (_err, rows) => {
      if (_err) reject(_err);
      resolve(rows);
    });
  });

const updateUsers = async (id, firstName, lastName, email, password) =>
  new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ? WHERE id = ?",
      [firstName, lastName, email, password, id],
      (_err, rows) => {
        if (_err) reject(_err);
        resolve(rows);
      }
    );
  });

const deleteUsers = async (id) =>
  new Promise((resolve, reject) => {
    connection.query("DELETE FROM users WHERE id = ?", [id], (_err, rows) => {
      if (_err) reject(_err);
      resolve(rows);
    });
  });

module.exports = {
  createUser,
  getAllUsers,
  getOneUsers,
  updateUsers,
  deleteUsers,
};
