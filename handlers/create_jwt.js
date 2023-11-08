const jwt = require("jsonwebtoken");
const create_jwt = (req, res) => {
  try {
    const payload = req.body;
    if (Object.keys(payload).length > 0) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res
        .cookie("jwt_token", token, {
          httpOnly: true,
          secure: false,
          sameSite: false,
        })
        .status(200)
        .send({ success: true });
    } else {
      res.status("401").send({ error: "unauthorized request!" });
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
module.exports = create_jwt;
