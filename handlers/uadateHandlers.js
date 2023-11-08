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
// update  food status
const updateFoodStatus = async (
  req,
  res,
  requestCollection,
  foodCollection
) => {
  const id = req.params.id;

  try {
    const updateDoc = { $set: req.body };
    const option = {
      upsert: true,
    };

    const result = await requestCollection.updateOne(
      { _id: new ObjectId(id) },
      updateDoc,
      option
    );

    let isUpdate = result.modifiedCount > 0 ? true : false;
    if (isUpdate) {
      const getResult = await requestCollection.findOne({
        _id: new ObjectId(id),
      });
      if (getResult?._id) {
        const { food_id } = getResult;
        const new_get_result = await foodCollection.findOne({
          _id: new ObjectId(food_id),
        });
        const {
          donator,
          food_image,
          food_name,
          expiry_date,
          pickup_location,
          quantity,
          additional_notes,
        } = new_get_result;

        const new_result = await foodCollection.updateOne(
          { _id: new ObjectId(food_id) },
          {
            $set: {
              donator,
              food_image,
              food_name,
              expiry_date,
              pickup_location,
              quantity,
              additional_notes,
              food_status: "delivered",
            },
          },
          { upsert: true }
        );
        if (new_result.modifiedCount > 0) {
          res.status(200).send(new_result);
        } else {
          res.status(200).send(result);
        }
      } else {
        res.status(200).send(result);
      }
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
module.exports = { updateAFood, updateFoodStatus };
