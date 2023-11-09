const jwt = require("jsonwebtoken");
const auth_guard = async (req, res, next) => {
  const token = req.cookies?.token;

  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(403).send({ error: "forbidden access." });
    }
  } else {
    res.status(401).send({ error: "unathorize access." });
  }
};

module.exports = auth_guard;
