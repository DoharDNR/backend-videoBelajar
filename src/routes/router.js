const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    serverMessage: "Hello World!",
    serverTime: new Date(),
  });
});

module.exports = router;
