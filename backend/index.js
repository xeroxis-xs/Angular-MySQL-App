const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const port = process.env.PORT || 8085;
const host = process.env.HOST || "localhost";

// Import service files
const userRoutes = require("./services/user");
const tempRoutes = require("./services/temp");
const humidRoutes = require("./services/humid");
const pm25Routes = require("./services/pm25");
const psiRoutes = require("./services/psi");
const levelRoutes = require("./services/level");
const coordRoutes = require("./services/coord");
const buildingRoutes = require("./services/building");

// Interval API
const apiPullTemp = require("./services/api_pull_temp");
const apiPullHumid = require("./services/api_pull_humid");
const apiPullPsi = require("./services/api_pull_psi");
const apiPullPm25 = require("./services/api_pull_pm25");

// Use service routes
server.use(bodyParser.json());
server.use("/api/users", userRoutes);
server.use("/api/temp", tempRoutes);
server.use("/api/humid", humidRoutes);
server.use("/api/pm25", pm25Routes);
server.use("/api/psi", psiRoutes);
server.use("/api/level", levelRoutes);
server.use("/api/coord", coordRoutes);
server.use("/api/building", buildingRoutes);

// Establish the server
server.listen(port, function check(error) {
  if (error) {
    console.log("Server: Error starting server at port: " + port);
  } else {
    console.log("Server: Started server at port " + port);
  }
});

server.get("/api", (req, res) => {
  res.send("API Home");
});

server.get("/api/db", (req, res) => {
  res.send("DB HOST: " + host);
});

server.get("/", (req, res) => {
  res.send("Index");
});
