const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const routes = require("./routes/router");
const connection = require("./db/connection");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

const PORT = process.env.PORT || 3001;
if (!PORT) {
  console.error("Port server berubah");
}

connection.connect((err) => {
  if (err) {
    console.error("Terganggu!", err);
  } else {
    console.log("database tersedia!");
  }
});

app.listen(PORT, () => {
  console.log("Server is running:", PORT);
});
