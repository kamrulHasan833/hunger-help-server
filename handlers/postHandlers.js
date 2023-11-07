// add a food
const addAFood = async (req, res, collection) => {
  try {
    const payload = req.body;
    const result = await collection.insertOne(payload);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
//  creqte a requesnt
const crateARequest = async (req, res, collection) => {
  try {
    const payload = req.body;
    const result = await collection.insertOne(payload);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
module.exports = { addAFood, crateARequest };
