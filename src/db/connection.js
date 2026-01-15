const mysql = require("mysql2");
const config = require("../config/index");

const connection = mysql.createConnection({
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  host: config.db.host,
  port: config.db.port,
});

module.exports = connection;
