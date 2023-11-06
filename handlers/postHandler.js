// get foods based on higher quantity
const crateARequest = async (req, res, collection) => {
  console.log("hello");
  try {
    const payload = req.body;
    const result = await collection.insertOne(payload);

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
module.exports = { crateARequest };
