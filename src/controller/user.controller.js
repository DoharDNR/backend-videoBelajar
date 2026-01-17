const UserModel = require("../models/user.model");
const {
  generatePassword,
  similarAccount,
  generateToken,
} = require("../utils/helper.auth");

const createUser = async (req, res) => {
  try {
    const { fullName, email, gender, phone, Password, profil_img } = req.body;

    if (!fullName && !email && !Password && !gender && !phone && !profil_img) {
      throw new Error("Pastikan semuanya terisi");
    }

    const allUser = await similarAccount(req.body);
    if (allUser.length > 0) {
      return res.status(409).json({
        status: 409,
        message: "Email telah digunakan!",
      });
    }

    const password = await generatePassword(Password);

    const createUser = await UserModel.createUser(
      fullName,
      email,
      gender,
      phone,
      password,
      profil_img,
    );

    if (!createUser.affectedRows) {
      throw new Error("Something Is Wrong");
    }

    return res.status(201).json({
      status: 201,
      data: req.body,
    });
  } catch (_err) {
    return res.status(500).json({
      status: 500,
      message: `Internal Server Error: ${_err} in createUser`,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUsers = await UserModel.getAllUsers();
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

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, password, gender, phone, profil_img } = req.body;

    if (!fullName && !email && !password && !gender && !phone && !profil_img) {
      throw new Error("Pastikan semua field terisi!");
    }

    const updateUser = await UserModel.updateUsers(
      id,
      fullName,
      email,
      password,
      gender,
      phone,
      profil_img,
    );

    if (!updateUser.affectedRows) {
      throw new Error("User not Updated!");
    }

    return res.status(200).json({
      status: 200,
      data: {
        id,
        fullName,
        email,
        password,
        gender,
        phone,
        profil_img,
      },
    });
  } catch (_err) {
    return res.status(500).json({
      status: 500,
      message: `Internal Server Error: ${_err.message}`,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updateUser = await UserModel.deleteUsers(id);
    if (!updateUser.affectedRows) {
      throw new Error("User not Updated!");
    }

    return res.status(200).json({
      status: 200,
      data: {
        id,
        message: "success",
      },
    });
  } catch (_err) {
    return res.status(500).json({
      status: 500,
      message: `Internal Server Error: ${_err.message}`,
    });
  }
};

module.exports = { createUser, getAllUser, getOneUser, updateUser, deleteUser };
