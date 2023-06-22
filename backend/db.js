const mysql = require("mysql2");
const env = require("dotenv").config();

// Create a connection pool
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USR,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Connect to database
db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB");
    console.log(error.code);
    console.log(error.sqlMessage);
  } else {
    console.log("Successfully Connected to DB");
  }
});

// Export the connection instance
module.exports = db;
