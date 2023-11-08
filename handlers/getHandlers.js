const { ObjectId } = require("mongodb");
// get all Foods
const getAllFoods = async (req, res, collection) => {
  try {
    const cursor = collection.find();
    const result = await cursor.toArray();

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
// get all foods of user
const getAllOfAUser = async (req, res, collection) => {
  const email = req.query.email;
  try {
    const cursor = collection.find({
      "donator.email": email,
    });
    const result = await cursor.toArray();

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
// get foods based on higher quantity
const getFoodsDescendingQuantity = async (req, res, collection) => {
  try {
    const cursor = collection.find();
    const result = await cursor.sort({ quantity: -1 }).limit(6).toArray();

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
// get foods based on higher quantity
const getFoodsDescendingExpiry = async (req, res, collection) => {
  try {
    const cursor = collection.find();
    const result = await cursor.sort({ expiry_date: -1 }).limit(6).toArray();

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
// get foods based on higher quantity
const getFoodsAscendingQuantity = async (req, res, collection) => {
  try {
    const cursor = collection.find();
    const result = await cursor.sort({ expiry_date: 1 }).limit(6).toArray();

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
// get foods based on higher quantity
const getFoodsByName = async (req, res, collection) => {
  const food_name = req.query.food_name;

  try {
    const cursor = collection.find({
      food_name: { $regex: new RegExp(food_name, "i") },
    });
    const result = await cursor.toArray();

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
// get a single food by id
const getSingleFood = async (req, res, collection) => {
  const food_Id = req.params.id;

  try {
    const result = await collection.findOne({ _id: new ObjectId(food_Id) });

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
// get requested foods
const getRequestedFoods = async (req, res, collection) => {
  const user_email = req.query.email;

  try {
    const cursor = collection.find({
      user_email: user_email,
    });
    const result = await cursor.toArray();

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
// get requested foods
const getRequestedFoodsById = async (req, res, collection) => {
  const id = req.params.id;

  try {
    const cursor = collection.find({
      food_id: id,
    });
    const result = await cursor.toArray();

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
module.exports = {
  getAllFoods,
  getFoodsDescendingQuantity,
  getFoodsDescendingExpiry,
  getFoodsAscendingQuantity,
  getFoodsByName,
  getSingleFood,
  getRequestedFoods,
  getAllOfAUser,
  getRequestedFoodsById,
};
