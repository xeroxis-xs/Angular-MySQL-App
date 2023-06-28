const express = require("express");
const router = express.Router();
const db = require("../db");

// Get All Buildings
router.get("/", (req, res) => {
  var sql = `SELECT * FROM building`;

  db.query(sql, function (error, result) {
    if (error) {
      res.statusCode = 400;
      console.log("Failed to get all buildings");
    } else {
      res.statusCode = 200;
      res.send({ result });
    }
  });
});

// Get Specific Coord
router.get("/:id", (req, res) => {
  var id = req.params.id;
  var sql = "SELECT * FROM building WHERE id =" + id;
  db.query(sql, function (error, result) {
    if (error) {
      res.statusCode = 400;
      console.log("Failed to get Building with id " + id);
    } else {
      res.statusCode = 200;
      res.send({ result });
    }
  });
});

module.exports = router;
