const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../db");

// Storage for Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../src/assets/uploads/"); // Specify the destination folder where uploaded files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename for the uploaded file
  },
});

const upload = multer({ storage });

// Create User
router.post("/", upload.single("file"), (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const contact = req.body.contact;
  const url = req.file.filename;

  const file = req.file;

  // Save the form data to MySQL
  const formData = { name, email, contact, url };
  // console.log(formData);
  db.query("INSERT INTO user SET ?", formData, (err, result) => {
    if (err) {
      console.error("Error inserting form data into MySQL:", err);

      res.statusCode = 400;
      res.status(500).send({ message: "Error submitting form!" });
    } else {
      console.log("Inserted into DB!");
      // Return a response
      res.statusCode = 201;
      res.send({ message: "Form submitted successfully!" });
    }
  });
});

// Get All Users
router.get("/", (req, res) => {
  const { page, limit } = req.query;
  const offset = (page - 1) * limit;
  // console.log(_page, _limit)

  if (page == null && limit == null) {
    var sql = `SELECT * FROM user`;
  } else {
    var sql = `SELECT * FROM user LIMIT ${offset}, ${limit}`;
  }

  db.query(sql, function (error, result) {
    if (error) {
      res.statusCode = 400;
      console.log("Failed to get all Users");
    } else {
      res.statusCode = 200;
      res.send({ result });
    }
  });
});

// Count all Users
router.get("/count", (req, res) => {
  var sql = "SELECT COUNT(id) FROM user";
  db.query(sql, function (error, result) {
    if (error) {
      res.statusCode = 400;
      console.log("Failed to User count");
    } else {
      res.statusCode = 200;
      res.send({ data: result[0]["COUNT(id)"] });
    }
  });
});

// Get Specific User
router.get("/:id", (req, res) => {
  var id = req.params.id;
  var sql = "SELECT * FROM user WHERE id=" + id;
  db.query(sql, function (error, result) {
    if (error) {
      res.statusCode = 400;
      console.log("Failed to get User with id " + id);
    } else {
      res.statusCode = 200;
      res.send({ result });
    }
  });
});

// Delete File
router.delete("/file/:filename", (req, res) => {
  const filename = req.params.filename;
  const fullPath = path.join(__dirname, "../src/assets/uploads/", filename);

  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error(err);
      res.statusCode = 400;
      res.send({ message: "File deletion failed" });
    } else {
      res.statusCode = 200;
      res.send({ message: "File deleted successfully" });
    }
  });
});

// Update User
router.put("/:id", upload.single("file"), (req, res) => {
  // console.log("req.file is " + req.file);
  let sql = "";

  if (req.file) {
    // if there is a new file
    console.log("There is file");
    sql =
      "UPDATE user SET name='" +
      req.body.name +
      "', email ='" +
      req.body.email +
      "', contact ='" +
      req.body.contact +
      "', url ='" +
      req.file.filename +
      "'  WHERE id =" +
      req.params.id;
  } else {
    // if ther is no file to be updated
    console.log("There is no file");
    sql =
      "UPDATE user SET name='" +
      req.body.name +
      "', email ='" +
      req.body.email +
      "', contact ='" +
      req.body.contact +
      "'  WHERE id =" +
      req.params.id;
  }

  db.query(sql, (error, result) => {
    if (error) {
      res.statusCode = 400;
      console.log(error);
      res.send({ message: "Failed to update User" });
    } else {
      res.statusCode = 200;
      res.send({ message: "User updated successfully" });
    }
  });
});

// Delete the User
router.delete("/:id", (req, res) => {
  let sql = "DELETE FROM user WHERE id=" + req.params.id + "";
  console.log(sql);
  let query = db.query(sql, (error) => {
    if (error) {
      res.statusCode = 400;
      res.send({ message: "Failed to delete User" });
    } else {
      res.statusCode = 200;
      res.send({ message: "User deleted successfully" });
    }
  });
});

module.exports = router;
