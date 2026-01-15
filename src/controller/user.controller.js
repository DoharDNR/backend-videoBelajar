const UserModel = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName && !lastName && !email && !password) {
      throw new Error("Pastikan semuanya terisi");
    }

    const createUser = await UserModel.createUser(
      firstName,
      lastName,
      email,
      password
    );
    if (!createUser.affectedRows) {
      throw new Error("Something Is Wrong");
    }

    return res.status(200).json({
      status: 200,
      data: req.body,
    });
  } catch (_err) {
    return res.status(500).json({
      status: 500,
      message: `Internal Server Error: ${_err.message}`,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUsers = await UserModel.getAllUsers;
    return res.status(200).json({
      status: 200,
      data: allUsers,
    });
  } catch (_err) {
    return res.status(500).json({
      status: 500,
      message: `Internal Server Error: ${_err.message}`,
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const allUsers = await UserModel.getOneUsers(req.params.id);
    return res.status(200).json({
      status: 200,
      data: allUsers,
    });
  } catch (_err) {
    return res.status(500).json({
      status: 500,
      message: `Internal Server Error: ${_err.message}`,
    });
  }
};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports = { createUser, getAllUser, getOneUser, updateUser, deleteUser };
