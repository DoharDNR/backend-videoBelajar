const UserModel = require("../models/user.model");
const { generatePassword, findAccount } = require("../utils/helper.auth");
const { verifyToken, deleteToken } = require("../utils/helper.verifyEmail");
const { mail } = require("../utils/mailer");

const createUser = async (req, res) => {
  try {
    const { fullName, email, gender, phone, password } = req.body;

    if (!fullName && !email && !password && !gender && !phone) {
      throw new Error("Pastikan semuanya terisi");
    }

    const allUser = await findAccount(email);
    if (allUser.length > 0) {
      return res.status(409).json({
        status: 409,
        message: "Email telah digunakan!",
      });
    }

    const Password = await generatePassword(password);

    const profil_img = "";

    const verify_token = Password;
    console.log(verify_token);
    if (!verify_token) {
      return Error("Terjadi kesalahan di verify_token");
    }

    const createUser = await UserModel.createUser(
      fullName,
      email,
      gender,
      phone,
      Password,
      profil_img,
      verify_token,
    );

    if (!createUser.affectedRows) {
      throw new Error("Something Is Wrong");
    }

    await mail(email, verify_token);

    return res.status(201).json({
      status: 201,
      message: "Register berhasil, Silahkan cek email anda untuk verifikasi",
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

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json("Token tidak ada");
    }

    const user = await verifyToken(token);
    if (!user.length > 0)
      return res.status(400).json("Invalid Verification Token");

    const del = await deleteToken();
    console.log(del);

    return res.status(200).json({
      status: 200,
      data: {
        message: "Email Verified Successfully",
      },
    });
  } catch (_err) {
    return res.status(500).json("Server error", _err);
  }
};

module.exports = {
  createUser,
  getAllUser,
  getOneUser,
  updateUser,
  verifyEmail,
};
