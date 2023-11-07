// configure donenv
require("dotenv").config();

// exports mongodb client and server
const { MongoClient, ServerApiVersion } = require("mongodb");

//  export internal modules
const {
  getAllFoods,
  getFoodsDescendingQuantity,
  getFoodsDescendingExpiry,
  getFoodsAscendingQuantity,
  getFoodsByName,
  getSingleFood,
  getRequestedFoods,
} = require("../handlers/getHandlers");

const { addAFood, crateARequest } = require("../handlers/postHandler");
const { deleteARequesedFood } = require("../handlers/deleteHandlers");
// mongodb uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qoh5erv.mongodb.net/?retryWrites=true&w=majority`;

// connect to mongodb database
const mongodbConfiguration = (app) => {
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  async function run() {
    try {
      // create collections
      const requestCollection = client.db("hunker-help").collection("request");
      const foodCollection = client.db("hunker-help").collection("foods");
      // get foods based on descending quantity
      app.get("/hunger-help/v1/foods", (req, res) => {
        getAllFoods(req, res, foodCollection);
      });
      // get foods based on descending quantity
      app.get("/hunger-help/v1/foods/descending-quatity", (req, res) => {
        getFoodsDescendingQuantity(req, res, foodCollection);
      });
      // get foods based on descending expriry
      app.get("/hunger-help/v1/foods/descending-expiry", (req, res) => {
        getFoodsDescendingExpiry(req, res, foodCollection);
      });
      // get foods based on ascending quantity
      app.get("/hunger-help/v1/foods/ascending-expiry", (req, res) => {
        getFoodsAscendingQuantity(req, res, foodCollection);
      });
      // get foods by food name
      app.get("/hunger-help/v1/foods/single", (req, res) => {
        getFoodsByName(req, res, foodCollection);
      });
      // get single food by id
      app.get("/hunger-help/v1/foods/single/:id", (req, res) => {
        getSingleFood(req, res, foodCollection);
      });
      // get single food by id
      app.get("/hunger-help/v1/request-foods", (req, res) => {
        getRequestedFoods(req, res, requestCollection);
      });
      // create a request
      app.post("/hunger-help/v1/foods", (req, res) => {
        addAFood(req, res, foodCollection);
      });

      // create a request
      app.post("/hunger-help/v1/request-foods", (req, res) => {
        crateARequest(req, res, requestCollection);
      });
      // delete a request
      app.delete("/hunger-help/v1/request-foods/:id", (req, res) => {
        deleteARequesedFood(req, res, requestCollection);
        console.log("hi");
      });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }
  run().catch(console.dir);
};
module.exports = mongodbConfiguration;
