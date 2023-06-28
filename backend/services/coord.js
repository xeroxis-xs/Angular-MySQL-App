const express = require("express");
const router = express.Router();
const db = require("../db");

// Get All Coords
router.get("/", (req, res) => {
  const level_id = req.query.level_id;
  // Get All Coords from A Level
  if (level_id) {
    var sql = "SELECT * FROM coord WHERE level_id = " + level_id;
  } else {
    var sql = "SELECT * FROM coord";
  }
  db.query(sql, function (error, result) {
    if (error) {
      res.statusCode = 400;
      console.log("Failed to get all coordinates");
    } else {
      res.statusCode = 200;
      res.send({ result });
    }
  });
});

// Get Specific Coord
router.get("/:id", (req, res) => {
  var id = req.params.id;
  var sql = "SELECT * FROM coord WHERE id =" + id;
  db.query(sql, function (error, result) {
    if (error) {
      res.statusCode = 400;
      console.log("Failed to get Coordinate with id " + id);
    } else {
      res.statusCode = 200;
      res.send({ result });
    }
  });
});

module.exports = router;
