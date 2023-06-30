const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../db");
const env = require("dotenv").config();
const interval = process.env.PSI_INTERVAL;

// Make periodic API requests and store data in MySQL
setInterval(() => {
  // Get the current time
  const currentTime = new Date();

  // Subtract 3 minutes
  // 3 minutes = 3 * 60 seconds * 1000 milliseconds
  const threeMinAgo = new Date(currentTime.getTime() - 3 * 60000);

  // Convert to SGT
  const options = { timeZone: "Asia/Singapore" };
  const currentTimeInSGT = new Date(
    currentTime.toLocaleString("en-US", options)
  );
  const threeMinAgoInSGT = new Date(
    threeMinAgo.toLocaleString("en-US", options)
  );

  // Format the DateTime
  const year = threeMinAgoInSGT.getFullYear();
  const month = String(threeMinAgoInSGT.getMonth() + 1).padStart(2, "0");
  const day = String(threeMinAgoInSGT.getDate()).padStart(2, "0");
  const hour = String(threeMinAgoInSGT.getHours()).padStart(2, "0");
  const minute = String(threeMinAgoInSGT.getMinutes()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}T${hour}%3A${minute}%3A00`;
  const displayDate = `${year}-${month}-${day} ${hour}:${minute}`;

  // P S I
  axios
    .get(
      `https://api.data.gov.sg/v1/environment/psi?date_time=${formattedDate}`
    )
    .then((response) => {
      const data = response.data;
      const stations = data.region_metadata;
      const station_values = data.items[0].readings;
      const timestamp_in_response = data.items[0].timestamp;
      const update_timestamp_in_response = data.items[0].update_timestamp;
      const api_status = data.api_info.status;
      let formData = [];

      for (let i = 0; i < stations.length; i++) {
        const dict = {
          name: String(stations[i].name),
          latitude: String(stations[i].label_location.latitude),
          longitude: String(stations[i].label_location.longitude),
          server_requested_time: String(currentTimeInSGT),
          timestamp_in_response: String(timestamp_in_response),
          update_timestamp_in_response: String(update_timestamp_in_response),

          item_value: String(
            station_values.psi_twenty_four_hourly[stations[i].name]
          ),
          api_status: String(api_status),
        };
        formData.push(dict);
      }
      // console.log(formData);

      // Store the data in MySQL
      const query =
        "INSERT INTO api_psi (name, latitude, longitude, server_requested_time, timestamp_in_response, update_timestamp_in_response, item_value, api_status) VALUES ?";

      db.query(
        query,
        [
          formData.map((item) => [
            item.name,
            item.latitude,
            item.longitude,
            item.server_requested_time,
            item.timestamp_in_response,
            item.update_timestamp_in_response,
            item.item_value,
            item.api_status,
          ]),
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting PSI into DB:", err);
          } else {
            console.log(displayDate + ": PSI inserted into DB");
          }
        }
      );
    })
    .catch((error) => {
      console.error(displayDate + ": Error fetching PSI from the API:", error);
    });
}, Number(interval) * 60000);

module.exports = router;
