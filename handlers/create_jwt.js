const jwt = require("jsonwebtoken");
const create_jwt = (req, res) => {
  try {
    const payload = req.body;
    if (Object.keys(payload).length > 0) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    } else {
      res.status("401").send({ error: "unauthorized request!" });
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
module.exports = create_jwt;
