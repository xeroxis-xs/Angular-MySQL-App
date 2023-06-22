const express = require("express");
const bodyParser = require("body-parser");
const server = express();

// Import service files
const userRoutes = require("./services/user");
const apiPullRoutes = require("./services/api_pull");
const tempRoutes = require("./services/temp");
const humidRoutes = require("./services/humid");
const pm25Routes = require("./services/pm25");
const psiRoutes = require("./services/psi");

// Use service routes
server.use(bodyParser.json());
server.use("/api/users", userRoutes);
server.use("/api/temp", tempRoutes);
server.use("/api/humid", humidRoutes);
server.use("/api/pm25", pm25Routes);
server.use("/api/psi", psiRoutes);

// Establish the server
server.listen(8085, function check(error) {
  if (error) {
    console.log("Error starting server at port: 8085");
  } else {
    console.log("Started server at port: 8085");
  }
});
