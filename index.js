// import externals
const express = require("express");
const cors = require("cors");
const mongodbConfiguration = require("./mongodb/mongodb.config");
const dotenv = require("dotenv");
const cookie_parser = require("cookie-parser");

// import internals
const create_jwt = require("./handlers/create_jwt");
const remove_jwt_token = require("./handlers/remove_jwt_token");
// create express app
const app = express();

// create root port
const port = process.env.PORT || 5000;

// configure dotenv
dotenv.config();

app.use(cookie_parser());

// external middlewares
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://phenomenal-stardust-ce9e22.netlify.app",
    ],
    credentials: true,
  })
);

// create routes or apis
app.get("/", (req, res) => {
  res.send("Hunker Help server is running...");
});
// create jsonwebtoken and pass it client cookie
app.post("/jsonwebtoken", create_jwt);
// remove cookie
app.delete("/signout", remove_jwt_token);

// connect mongodb database
mongodbConfiguration(app);

// listen server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});
