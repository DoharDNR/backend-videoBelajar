const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const router = require("./routes/router");
const users = require("./routes/users.route");
const admin = require("./routes/admin.router");
const connection = require("./db/connection");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use("/", users);
app.use("/admin", admin);

const PORT = process.env.PORT || 3001;
if (!PORT) {
  console.error("Port server berubah");
}

connection.connect((err) => {
  if (err) {
    console.error("Terganggu!", err.sqlMessage);
  } else {
    console.log("database tersedia!");
  }
});

app.listen(PORT, () => {
  console.log("Server is running:", PORT);
});
