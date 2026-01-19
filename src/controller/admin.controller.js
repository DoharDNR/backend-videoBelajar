const UserModel = require("../models/user.model");
const {
  generateToken,
  comparePassword,
  findAccount,
  generatePassword,
} = require("../utils/helper.auth");

const adminRegister = async (req, res) => {
  try {
    const { fullName, email, password, gender, phone, profil_img } = req.body;

    if (!fullName && !email && !password && !gender && !phone) {
      return res
        .status(400)
        .json({ status: 400, message: "Pastikan semuanya terisi" });
    }

    const email_dummy = "admin@gmail.com";
    const checkAccount = await findAccount(email_dummy, password);
    if (checkAccount.length > 0)
      return res.status(400).json({
        status: 400,
        message: "Akun telah dibuat dan hanya bisa satu.",
      });

    const Password = await generatePassword(password);

    const createUser = await UserModel.createUser(
      fullName,
      email,
      gender,
      phone,
      Password,
      profil_img,
    );

    if (!createUser.affectedRows) {
      throw new Error("Something Is Wrong");
    }

    return res.status(200).json({
      status: 200,
      data: req.body,
      message: "Register berhasil, Silahkan Login",
    });
  } catch (_err) {
    return console.error("Terjadi masalah di adminRegister", _err);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password)
      return res
        .status(400)
        .json({ status: 400, message: "Pastikan semuanya terisi" });

    const checkAccount = await findAccount(email);
    if (!checkAccount.length)
      return res.status(401).json({
        status: 401,
        message: "Not Found Email !!!",
        data: checkAccount,
      });

    const user = checkAccount[0].password;

    const ok = await comparePassword(password, user);
    if (!ok)
      return res
        .status(401)
        .json({ status: 401, message: "Invalid Email or Password", data: ok });

    return res.status(200).json({
      status: 200,
      data: req.body,
      token: generateToken(req.body),
    });
  } catch (_err) {
    console.error("Error Login", _err);
  }
};

const adminUsers = (req, res) => {
  UserModel.getAllUsers()
    .then((items) => res.status(200).json({ status: 200, data: items }))
    .catch((_err) => res.status(500).json({ status: 500, message: _err }));
};

const adminUser = (req, res) => {
  const { id } = req.params;
  UserModel.getOneUsers(id)
    .then((item) => res.status(200).json({ status: 200, data: item }))
    .catch((_err) => res.status(500).json({ status: 500, message: _err }));
};

const adminEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, password, gender, phone, profil_img } = req.body;

    if (!fullName && !email && !password && !gender && !phone && !profil_img) {
      throw new Error("Pastikan semua field terisi!");
    }

    const Password = await generatePassword(password);

    const updateUser = await UserModel.updateUsers(
      id,
      fullName,
      email,
      Password,
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
        data: req.body,
      },
    });
  } catch (_err) {
    return res.status(500).json({
      status: 500,
      message: `Internal Server Error: ${_err.message}`,
    });
  }
};

const adminDelete = (req, res) => {
  const { id } = req.params;

  UserModel.deleteUsers(id)
    .then((del) =>
      res
        .status(200)
        .json({ status: 200, message: "Berhasil terhapus", data: del }),
    )
    .catch((_err) => res.status(500).json({ status: 500, message: _err }));
};

module.exports = {
  adminRegister,
  adminLogin,
  adminUsers,
  adminUser,
  adminEdit,
  adminDelete,
};
