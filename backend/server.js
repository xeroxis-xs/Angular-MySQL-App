require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql2");
const server = express();


server.use(bodyParser.json());

// // Enale CORS for all routes
// server.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });


// Establish the database connection
const db = mysql.createConnection({

    host: process.env.HOST,
    user: process.env.USR,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,

});

db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
      console.log(error.code);
      console.log(error.sqlMessage);
    } else {
      console.log("Successfully Connected to DB");
    }
  });

// Establish the Port for API
  server.listen(8085,function check(error) {
    if (error) 
    { console.log("Error starting server at port: 8085");}
    else 
    { console.log("Started server at port: 8085");}
});

// Create User
server.post("/api/users/add", (req, res) => {
    let details = {
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      url: req.body.url
    };
    let sql = "INSERT INTO user SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.statusCode = 400;
        res.send({ status: false, message: "Failed to create User" });
      } else {
        res.statusCode = 201;
        res.send({ status: true, message: "User created successfully" });
      }
    });
  });

// Get All Users
server.get("/api/users", (req, res) => {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    var sql = `SELECT * FROM user LIMIT ${offset}, ${limit}`;

    db.query(sql, function (error, result){
      if (error) {
        res.statusCode = 400;
        console.log("Failed to get all Users");
      } else {
        res.statusCode = 200;
        res.send({ status: true, data: result });
      }
    });
  });


// Get Specific User
server.get("/api/users/:id", (req, res) => {
    var id = req.params.id;
    var sql = "SELECT * FROM user WHERE id=" + id;
    db.query(sql, function (error, result) {
      if (error) {
        res.statusCode = 400;
        console.log("Failed to get User with id " + id);
      } else {
        res.statusCode = 200;
        res.send({ status: true, data: result });
      }
    });
  });



// Update User
server.put("/api/student/update/:id", (req, res) => {
    let sql =
      "UPDATE user SET name='" +
      req.body.name +
      "', email='" +
      req.body.email +
      "',contact='" +
      req.body.contact +
      "',url='" +
      req.body.url +
      "'  WHERE id=" +
      req.params.id;
  
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.statusCode = 400;
        res.send({ status: false, message: "Failed to update User" });
      } else {
        res.statusCode = 200;
        res.send({ status: true, message: "Student updated successfully" });
      }
    });
  });



  // Delete the User
  server.delete("/api/users/:id", (req, res) => {
    let sql = "DELETE FROM user WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.statusCode = 400;
        res.send({ status: false, message: "Failed to delete User" });
      } else {
        res.statusCode = 200;
        res.send({ status: true, message: "User deleted successfully" });
      }
    });
  });