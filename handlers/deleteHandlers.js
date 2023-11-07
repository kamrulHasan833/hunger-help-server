const { ObjectId } = require("mongodb");

// get a single food by id
const deleteAFood = async (req, res, foodCollection, requestCollection) => {
  const food_Id = req.params.id;

  try {
    const result = await foodCollection.deleteOne({
      _id: new ObjectId(food_Id),
    });
    let isDelete = result.deletedCount > 0 ? true : false;

    if (isDelete) {
      const newResult = await requestCollection.deleteOne({
        food_id: food_Id,
      });
      isDelete = newResult.deletedCount > 0 ? true : false;
      if (isDelete) {
        res.status(200).send(newResult);
      } else {
        res.status(200).send(result);
      }
    } else {
      res.status(500).send({ error: "server error" });
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
// get a single food by id
const deleteARequesedFood = async (req, res, collection) => {
  const food_Id = req.params.id;

  try {
    const result = await collection.deleteOne({ _id: new ObjectId(food_Id) });

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = { deleteAFood, deleteARequesedFood };
