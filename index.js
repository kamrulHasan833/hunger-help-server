// import external modules
const express = require("express");
const cors = require("cors");
const mongodbConfiguration = require("./mongodb/mongodb.config");
const dotenv = require("dotenv");

// create express app
const app = express();

// create root port
const port = process.env.PORT || 5000;

// configure dotenv
dotenv.config();

// external middlewares
app.use(express.json());
app.use(cors());

// create routes or apis
app.get("/", (req, res) => {
  res.send("Hunker Help server is running...");
});

// connect mongodb database
mongodbConfiguration(app);

// listen server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});
