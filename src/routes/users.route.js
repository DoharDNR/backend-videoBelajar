const router = require("express").Router();
const UsersControllers = require("../controller/user.controller");

router.post("/register", UsersControllers.createUser);
router.get("/login", UsersControllers.getAllUser);
router.get("/users/:id", UsersControllers.getOneUser);
router.put("/users/:id", UsersControllers.updateUser);
router.get("/verify-email", UsersControllers.verifyEmail);

module.exports = router;
