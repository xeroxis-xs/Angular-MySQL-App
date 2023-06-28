const express = require("express");
const router = express.Router();
const db = require("../db");

// Get All Levels
router.get("/", (req, res) => {
  const { page, limit } = req.query;
  const offset = (page - 1) * limit;
  //   console.log(offset, limit);
  var sql = `SELECT * FROM level`;

  db.query(sql, function (error, result) {
    if (error) {
      res.statusCode = 400;
      console.log("Failed to get all levels");
    } else {
      res.statusCode = 200;
      res.send({ result });
    }
  });
});

// Get All Levels and Coords
router.get("/all", (req, res) => {
  const { page, limit } = req.query;
  const offset = (page - 1) * limit;
  //   console.log(offset, limit);
  var sql = `SELECT level.id AS level_id,
  level.name AS level_name,
  level.url AS level_url,
  level.details AS level_details,
  coord.id AS coord_id,
  coord.name AS coord_name,
  coord.x AS coord_x,
  coord.y AS coord_y,
  coord.height AS coord_height,
  coord.width AS coord_width,
  coord.details AS coord_details
   FROM level, coord WHERE level.id = coord.level_id`;

  db.query(sql, function (error, result) {
    if (error) {
      res.statusCode = 400;
      console.log("Failed to get all levels");
    } else {
      res.statusCode = 200;
      res.send({ result });
    }
  });
});

// Get Specific Level
router.get("/:id", (req, res) => {
  var id = req.params.id;
  var sql =
    "SELECT level.id AS id, building.name AS building_name, building.id AS building_id, level.url AS url, level.name AS level_name, level.details AS details  FROM building, level WHERE level.id =" +
    id +
    " AND level.building_id = building.id";
  // console.log(sql);
  db.query(sql, function (error, result) {
    if (error) {
      res.statusCode = 400;
      console.log("Failed to get Level with id " + id);
    } else {
      res.statusCode = 200;
      res.send({ result });
    }
  });
});

module.exports = router;
