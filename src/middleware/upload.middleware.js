const multer = require("multer");
// const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const extensiImg = ["image/jpeg", "image/jpg", "image/png"];

  if (extensiImg.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Format file tidak mendukung"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
