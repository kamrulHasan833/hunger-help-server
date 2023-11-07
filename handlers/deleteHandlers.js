const { ObjectId } = require("mongodb");
// get a single food by id
const deleteARequesedFood = async (req, res, collection) => {
  const food_Id = req.params.id;
  console.log(food_Id);
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(food_Id) });

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = { deleteARequesedFood };
