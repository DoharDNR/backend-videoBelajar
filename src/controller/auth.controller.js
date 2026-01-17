const {
  generateToken,
  matchmaking,
  comparePassword,
} = require("../utils/helper.auth");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password)
      return res
        .status(400)
        .json({ status: 400, message: "Pastikan semuanya terisi" });

    const checkAccount = await matchmaking(req.body);
    if (!checkAccount.length)
      return res
        .status(401)
        .json({ status: 401, message: "Invalid Email or Password !!!" });

    const user = checkAccount[0].password;

    const ok = await comparePassword(password, user);
    if (!ok)
      return res
        .status(401)
        .json({ status: 401, message: "Invalid Email or Password" });

    return res.status(200).json({
      status: 200,
      data: req.body,
      token: generateToken(req.body),
    });
  } catch (_err) {
    console.error("Error Login", _err);
  }
};

module.exports = { login };
