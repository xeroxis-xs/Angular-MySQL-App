require('dotenv').config();
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const mysql = require("mysql2");
const server = express();
const fs = require('fs');
const axios = require('axios');




// server.use(bodyParser.json());
// server.use(express.urlencoded({ extended: true }));

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

// Storage for Images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify the destination folder where uploaded files will be saved
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Set the filename for the uploaded file
    }
  });

const upload = multer({ storage });


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
server.post("/api/users", upload.single('file'), (req, res) => {
    
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const url = req.file.path;

    const file = req.file;

  // Save the form data to MySQL
  const formData = { name, email, contact, url };
  console.log(formData)
  db.query('INSERT INTO user SET ?', formData, (err, result) => {
    if (err) {
      console.error('Error inserting form data into MySQL:', err);

      res.statusCode = 400;
      res.status(500).send({ data: 'Error submitting form!' });
    }
    else {
        console.log('Inserted into DB!');
        // Return a response
        res.statusCode = 201;
        res.send({ data: 'Form submitted successfully!' });
    }
  });

  });

// Get All Users
server.get("/api/users", (req, res) => {
    const { page, limit } = req.query;
    const offset = ( page - 1) * limit;
    // console.log(_page, _limit)

    if (page == null && limit == null){
        var sql = `SELECT * FROM user`;
    } else {
        var sql = `SELECT * FROM user LIMIT ${offset}, ${limit}`;
    }

    db.query(sql, function (error, result){
      if (error) {
        res.statusCode = 400;
        console.log("Failed to get all Users");
      } else {
        res.statusCode = 200;
        res.append('X-Total-Count', result.length)
        res.send({ status: true, data: result });
      }
    });
  });

  // Count all Users
  server.get("/api/users/count", (req, res) => {
    var sql = "SELECT COUNT(id) FROM user";
    db.query(sql, function (error, result) {
      if (error) {
        res.statusCode = 400;
        console.log("Failed to User count");
      } else {
        res.statusCode = 200;
        res.send({ status: true, data: result[0]["COUNT(id)"] });
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
        res.send({ result });
      }
    });
  });



// Update User
server.put("/api/users/:id", (req, res) => {
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
        console.log(error)
        res.send({ status: false, message: "Failed to update User" });
      } else {
        res.statusCode = 200;
        res.send({ status: true, message: "User updated successfully" });
      }
    });
  });

  // Delete the User
  server.delete("/api/users/:id", (req, res) => {
    let sql = "DELETE FROM user WHERE id=" + req.params.id + "";
    console.log(sql)
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

// Make periodic API requests and store data in MySQL
// Minute-by-minute air temperature readings at weather-station level.
setInterval(() => {
    // Get the current time
    const currentTime = new Date();

    // Subtract 3 minutes
    // 3 minutes = 3 * 60 seconds * 1000 milliseconds
    const threeMinAgo = new Date(currentTime.getTime() - (3 * 60000)); 

    // Convert to SGT
    const options = { timeZone: 'Asia/Singapore' };
    const threeMinAgoInSGT = new Date(threeMinAgo.toLocaleString('en-US', options));

    // Format the DateTime
    const year = threeMinAgoInSGT.getFullYear();
    const month = String(threeMinAgoInSGT.getMonth() + 1).padStart(2, '0');
    const day = String(threeMinAgoInSGT.getDate()).padStart(2, '0');
    const hour = String(threeMinAgoInSGT.getHours()).padStart(2, '0');
    const minute = String(threeMinAgoInSGT.getMinutes()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hour}%3A${minute}%3A00`;
    const displayDate = `${year}-${month}-${day} ${hour}:${minute}`;

    console.log("---------------------")
    console.log(displayDate + "\n")

    axios.get(`https://api.data.gov.sg/v1/environment/air-temperature?date_time=${formattedDate}`) 
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
                server_requested_time: String(displayDate),
                timestamp_in_response: String(timestamp_in_response),
                item_station_id: String(station_values[i].station_id),
                item_value: String(station_values[i].value),
                api_status:String(api_status)
             };
             formData.push(dict);

        }
        console.log(formData)
  
        // Store the data in MySQL
        const query = 'INSERT INTO api_air_temp (api_id, device_id, name, latitude, longitude, server_requested_time, timestamp_in_response, item_station_id, item_value, api_status) VALUES ?'; 
  
        // const values = data.map((item) => [item.field1, item.field2, ...]); // Replace field1, field2, ... with the corresponding fields in the API response
  
        db.query(query, [formData.map(item => [
            item.api_id, 
            item.device_id, 
            item.name,
            item.latitude,
            item.longitude,
            item.server_requested_time,
            item.timestamp_in_response,
            item.item_station_id,
            item.item_value,
            item.api_status
        ])], (err, result) => {
          if (err) {
            console.error('Error inserting data into MySQL:', err);
          } else {
            console.log('Data inserted into MySQL');
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching data from the API:', error);
      });
  }, 10000); // Specify the interval in milliseconds (e.g., 10000 for every 10 seconds)