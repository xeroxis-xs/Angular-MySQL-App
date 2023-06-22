const express = require("express");
const router = express.Router();
const db = require("../db");
const moment = require("moment");

// Get All Temps
router.get("/", (req, res) => {
  const { page, limit } = req.query;
  const offset = (page - 1) * limit;
  //   console.log(offset, limit);

  if (page == null && limit == null) {
    var sql = `SELECT id, device_id, name, timestamp_in_response, item_value FROM api_air_temp ORDER BY id DESC`;
  } else {
    var sql = `SELECT id, device_id, name, timestamp_in_response, item_value FROM api_air_temp LIMIT ${offset}, ${limit} ORDER BY id DESC`;
  }

  db.query(sql, function (error, result) {
    if (error) {
      res.statusCode = 400;
      console.log("Failed to get all Temps");
    } else {
      result.forEach((row) => {
        const date = new Date(row.timestamp_in_response);
        const options = {
          timeZone: "Asia/Singapore",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };
        // const formattedDate = date.toLocaleString("en-SG", options);
        // const formattedDate = date;
        const formattedDate = moment(date).format("DD/MM/yyyy HH:mm");
        // const formattedTime = moment(date).format("LT");
        row.timestamp_in_response = formattedDate;
        row.item_value = Number(row.item_value);
        // row.timestamp_in_response_time = formattedTime;
      });

      //   console.log(result);

      res.statusCode = 200;
      res.send({ result });
    }
  });
});

// Get Specific Temp
router.get("/:id", (req, res) => {
  var id = req.params.id;
  var sql = "SELECT * FROM api_air_temp WHERE id =" + id;
  db.query(sql, function (error, result) {
    if (error) {
      res.statusCode = 400;
      console.log("Failed to get Temp with id " + id);
    } else {
      res.statusCode = 200;
      res.send({ result });
    }
  });
});

module.exports = router;
