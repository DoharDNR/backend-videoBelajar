const { login } = require("../controller/auth.controller");

const router = require("express").Router();

router.get("/login", login);

module.exports = router;
