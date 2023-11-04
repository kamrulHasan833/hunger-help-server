// import external modules
const express = require("express");
const cors = require("cors");

// create root port
const port = process.env.PORT || 5000;

// create express app
const app = express();

// external middlewares
app.use(express.json());
app.use(cors());

// create routes or apis
app.get("/", (req, res) => {
  res.send("Hunker Help server is running...");
});

// listen server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});
