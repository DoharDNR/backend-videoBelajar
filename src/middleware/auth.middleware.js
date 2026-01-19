const jwt = require("jsonwebtoken");

const authVerify = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        status: 401,
        message: "Missing or invalid token",
        getHeader: req.headers,
      });
    }

    next();
  } catch (_err) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
      _err,
    });
  }
};

module.exports = { authVerify };
