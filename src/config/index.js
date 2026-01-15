const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const config = {
  port: process.env.PORT || 3001,
  db: {
    host: process.env.HOST || "localhost",
    user: process.env.DB_USER || "pdn",
    password: process.env.DB_PASSWORD || "admin123",
    database: process.env.DB_NAME || "name_db",
    port: process.env.DB_PORT || 3306,
  },
};

module.exports = config;
