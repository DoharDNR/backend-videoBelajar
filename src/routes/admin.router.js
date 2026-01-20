const {
  adminRegister,
  adminLogin,
  adminUsers,
  adminUser,
  adminEdit,
  adminDelete,
} = require("../controller/admin.controller");
const { authVerify } = require("../middleware/auth.middleware");

const router = require("express").Router();

router.post("/register", adminRegister);
router.get("/login", adminLogin);
router.get("/users", authVerify, adminUsers);
router.get("/user/:id", authVerify, adminUser);
router.put("/edit/:id", authVerify, adminEdit);
router.delete("/delete/:id", adminDelete);

module.exports = router;
