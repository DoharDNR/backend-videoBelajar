const {
  productRegister,
  productAll,
  productOne,
  productEdit,
  productDelete,
} = require("../controller/product.controller");

const router = require("express").Router();

router.post("/register", productRegister);
router.get("/all", productAll);
router.get("/one/:id", productOne);
router.put("/edit/:id", productEdit);
router.delete("/delete/:id", productDelete);

module.exports = router;
