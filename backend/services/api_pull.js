const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../db");

// Make periodic API requests and store data in MySQL
// Minute-by-minute air temperature readings at weather-station level.
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

  // Minute Interval for Temp and Humidity
  // T E M P E R A T U R E
  axios
    .get(
      `https://api.data.gov.sg/v1/environment/air-temperature?date_time=${formattedDate}`
    )
    .then((response) => {
      const data = response.data;
      const stations = data.metadata.stations;
      const station_values = data.items[0].readings;
      const timestamp_in_response = data.items[0].timestamp;
      const api_status = data.api_info.status;
      let formData = [];

      for (let i = 0; i < stations.length; i++) {
        const dict = {
          api_id: String(stations[i].id),
          device_id: String(stations[i].device_id),
          name: String(stations[i].name),
          latitude: String(stations[i].location.latitude),
          longitude: String(stations[i].location.longitude),
          server_requested_time: String(currentTimeInSGT),
          timestamp_in_response: String(timestamp_in_response),
          item_station_id: String(station_values[i].station_id),
          item_value: String(station_values[i].value),
          api_status: String(api_status),
        };
        formData.push(dict);
      }
      // console.log(formData)

      // Store the data in MySQL
      const query =
        "INSERT INTO api_air_temp (api_id, device_id, name, latitude, longitude, server_requested_time, timestamp_in_response, item_station_id, item_value, api_status) VALUES ?";

      db.query(
        query,
        [
          formData.map((item) => [
            item.api_id,
            item.device_id,
            item.name,
            item.latitude,
            item.longitude,
            item.server_requested_time,
            item.timestamp_in_response,
            item.item_station_id,
            item.item_value,
            item.api_status,
          ]),
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting Temp into DB:", err);
          } else {
            console.log(displayDate + ": Temp inserted into DB");
          }
        }
      );
    })
    .catch((error) => {
      console.error(displayDate + ": Error fetching Temp from the API:", error);
    });

  // H U M I D I T Y
  axios
    .get(
      `https://api.data.gov.sg/v1/environment/relative-humidity?date_time=${formattedDate}`
    )
    .then((response) => {
      const data = response.data;
      const stations = data.metadata.stations;
      const station_values = data.items[0].readings;
      const timestamp_in_response = data.items[0].timestamp;
      const api_status = data.api_info.status;
      let formData = [];

      for (let i = 0; i < stations.length; i++) {
        const dict = {
          api_id: String(stations[i].id),
          device_id: String(stations[i].device_id),
          name: String(stations[i].name),
          latitude: String(stations[i].location.latitude),
          longitude: String(stations[i].location.longitude),

          server_requested_time: String(currentTimeInSGT),
          timestamp_in_response: String(timestamp_in_response),

          item_station_id: String(station_values[i].station_id),
          item_value: String(station_values[i].value),
          api_status: String(api_status),
        };
        formData.push(dict);
      }
      // console.log(formData)

      // Store the data in MySQL
      const query =
        "INSERT INTO api_humid (api_id, device_id, name, latitude, longitude, server_requested_time, timestamp_in_response, item_station_id, item_value, api_status) VALUES ?";

      db.query(
        query,
        [
          formData.map((item) => [
            item.api_id,
            item.device_id,
            item.name,
            item.latitude,
            item.longitude,
            item.server_requested_time,
            item.timestamp_in_response,
            item.item_station_id,
            item.item_value,
            item.api_status,
          ]),
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting Humidity into DB:", err);
          } else {
            console.log(displayDate + ": Humidity inserted into DB");
          }
        }
      );
    })
    .catch((error) => {
      console.error(
        displayDate + ": Error fetching Humidity from the API:",
        error
      );
    });

  // Hourly Interval for PM2.5 and PSI
  if (minute === "15") {
    // if (true) {
    // P M 2 . 5
    axios
      .get(
        `https://api.data.gov.sg/v1/environment/pm25?date_time=${formattedDate}`
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
              station_values.pm25_one_hourly[stations[i].name]
            ),
            api_status: String(api_status),
          };
          formData.push(dict);
        }
        // console.log(formData);

        // Store the data in MySQL
        const query =
          "INSERT INTO api_pm25 (name, latitude, longitude, server_requested_time, timestamp_in_response, update_timestamp_in_response, item_value, api_status) VALUES ?";

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
              console.error("Error inserting PM2.5 into DB:", err);
            } else {
              console.log(displayDate + ": PM2.5 inserted into DB");
            }
          }
        );
      })
      .catch((error) => {
        console.error(
          displayDate + ": Error fetching PM2.5 from the API:",
          error
        );
      });

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
        console.error(
          displayDate + ": Error fetching PSI from the API:",
          error
        );
      });
  }

  // Every 1 Minute
}, 1 * 60000);

module.exports = router;
