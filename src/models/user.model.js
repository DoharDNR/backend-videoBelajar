const connection = require("../db/connection");

const createUser = async (
  fullName,
  email,
  gender,
  phone,
  password,
  profil_img,
  verify_token,
) =>
  new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO users VALUES (?,?,?,?,?,?,?,?)",
      [
        crypto.randomUUID(),
        fullName,
        email,
        password,
        gender,
        phone,
        profil_img,
        verify_token,
      ],
      (_err, rows) => {
        if (_err) reject(_err);
        resolve(rows);
      },
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

const updateUsers = async (
  id,
  fullName,
  email,
  password,
  gender,
  phone,
  profil_img,
) =>
  new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET fullName = ?, email = ?, password = ?, gender = ?, phone = ?, profil_img = ? WHERE id = ?",
      [fullName, email, password, gender, phone, profil_img, id],
      (_err, rows) => {
        if (_err) reject(_err);
        resolve(rows);
      },
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
