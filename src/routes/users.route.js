const router = require("express").Router();
const UsersControllers = require("../controller/user.controller");

router.post("/users", UsersControllers.createUser);
router.get("/users", UsersControllers.getAllUser);
router.get("/users/:id", UsersControllers.getOneUser);
router.put("/users/:id", UsersControllers.updateUser);
router.delete("/users/:id", UsersControllers.deleteUser);

module.exports = router;
