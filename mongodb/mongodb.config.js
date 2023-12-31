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
  getAllOfAUser,
  getRequestedFoodsById,
} = require("../handlers/getHandlers");

const { addAFood, crateARequest } = require("../handlers/postHandlers");
const { updateAFood, updateFoodStatus } = require("../handlers/uadateHandlers");
const {
  deleteAFood,
  deleteARequesedFood,
} = require("../handlers/deleteHandlers");

const authGuard = require("../middlewares/authentication/auth_guard");

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
      // get all foods of a user
      app.get("/hunger-help/v1/foods/users", authGuard, (req, res) => {
        getAllOfAUser(req, res, foodCollection);
      });
      // get foods based on descending quantity
      app.get(
        "/hunger-help/v1/foods/descending-quatity",

        (req, res) => {
          getFoodsDescendingQuantity(req, res, foodCollection);
        }
      );
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
      app.get("/hunger-help/v1/foods/single/:id", authGuard, (req, res) => {
        getSingleFood(req, res, foodCollection);
      });
      // get all request food of a user
      app.get("/hunger-help/v1/request-foods", authGuard, (req, res) => {
        getRequestedFoods(req, res, requestCollection);
      });
      // get all request food under a id
      app.get(
        "/hunger-help/v1/request-foods/users/:id",
        authGuard,

        (req, res) => {
          getRequestedFoodsById(req, res, requestCollection);
        }
      );

      // create a food
      app.post("/hunger-help/v1/foods", authGuard, (req, res) => {
        addAFood(req, res, foodCollection);
      });
      // create a request
      app.put("/hunger-help/v1/foods/users/:id", authGuard, (req, res) => {
        updateAFood(req, res, foodCollection);
      });
      // delete a food
      app.delete("/hunger-help/v1/foods/users/:id", authGuard, (req, res) => {
        deleteAFood(req, res, foodCollection, requestCollection);
      });

      // create a request
      app.post("/hunger-help/v1/request-foods", authGuard, (req, res) => {
        crateARequest(req, res, requestCollection);
      });
      // update food status
      app.put("/hunger-help/v1/request-foods/:id", authGuard, (req, res) => {
        updateFoodStatus(req, res, requestCollection, foodCollection);
      });

      // delete a request
      app.delete(
        "/hunger-help/v1/request-foods/:id",
        authGuard,

        (req, res) => {
          deleteARequesedFood(req, res, requestCollection);
        }
      );
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
