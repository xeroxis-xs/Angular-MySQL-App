const mysql = require("mysql2");
const host = process.env.HOST || "localhost";
const user = process.env.USR || "angular_user";
const password = process.env.PASSWORD || "angular_password";
const database = process.env.DATABASE || "angular_db";
// const env = require("dotenv").config();

// Create a connection pool
const db = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

// Connect to database
db.connect(function (error) {
  if (error) {
    console.log("DB: Error Connecting to " + database + " at " + host);
    console.log(error.code);
    console.log(error.sqlMessage);
  } else {
    console.log("DB: Successfully Connected to " + database + " at " + host);
  }
});

// Export the connection instance
module.exports = db;
