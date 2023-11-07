const { ObjectId } = require("mongodb");

// update a food
const updateAFood = async (req, res, collection) => {
  const food_id = req.params.id;

  try {
    const updateDoc = { $set: req.body };
    const option = {
      upsert: true,
    };
    const result = await collection.updateOne(
      { _id: new ObjectId(food_id) },
      updateDoc,
      option
    );

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
module.exports = { updateAFood };
