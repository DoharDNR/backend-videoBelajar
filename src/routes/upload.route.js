const router = require("express").Router();
const upload = require("../middleware/upload.middleware");

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      message: "Upload berhasil!",
      file: req.file,
    });
  } catch (_err) {
    return res.status(500).json("Gagal upload", _err);
  }
});

module.exports = router;
