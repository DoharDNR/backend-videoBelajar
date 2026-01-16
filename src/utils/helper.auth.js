const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

const generatePassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (_err) {
    console.error("Bermasalah buat loe!", _err);
  }
};

const similarAccount = async (getRegsiter) => {
  const allUser = await UserModel.getAllUsers();

  const a =
    allUser.find((items) => items.fullName === getRegsiter.fullName) ||
    allUser.find((items) => items.email === getRegsiter.email);

  return a;
};

module.exports = { generatePassword, similarAccount };
