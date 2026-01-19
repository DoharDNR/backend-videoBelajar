const connection = require("../db/connection");

const createProduct = async (title, thumbnail, description, price, discount) =>
  new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO product VALUE (?,?,?,?,?,?)",
      [crypto.randomUUID(), thumbnail, title, description, price, discount],
      (_err, rows) => {
        if (_err) reject(_err);
        resolve(rows);
      },
    );
  });

const getAllProduct = () =>
  new Promise((resolve, reject) => {
    connection.query("SELECT * FROM product", (_err, rows) => {
      if (_err) reject(_err);
      resolve(rows);
    });
  });

const getOneProduct = (id) =>
  new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM product WHERE id = ?",
      [id],
      (_err, rows) => {
        if (_err) reject(_err);
        resolve(rows);
      },
    );
  });

const editProduct = async (
  id,
  title,
  thumbnail,
  description,
  price,
  discount,
) =>
  new Promise((resolve, reject) => {
    connection.query(
      "UPDATE product SET thumbnail = ?, title = ?, description = ?, price = ?, discount = ? WHERE id = ?",
      [thumbnail, title, description, price, discount, id],
      (_err, rows) => {
        if (_err) reject(_err);
        resolve(rows);
      },
    );
  });

const deleteProduct = async (id) =>
  new Promise((resolve, reject) => {
    connection.query("DELETE FROM product WHERE id = ?", [id], (_err, rows) => {
      if (_err) reject(_err);
      resolve(rows);
    });
  });
module.exports = {
  createProduct,
  getAllProduct,
  getOneProduct,
  editProduct,
  deleteProduct,
};
