const jwt = require("jsonwebtoken");
const auth_guard = async (req, res, next) => {
  const token = req.cookies?.token;
  const email = req.query.email;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
      const { email: stored_email } = user;
      if (stored_email === email) {
        req.user = user;
        next();
      } else {
        res.status(403).send({ error: "forbidden access." });
      }
    } else {
      res.status(401).send({ error: "unauthorized access." });
    }
  } else {
    res.status(401).send({ error: "unathorized access." });
  }
};

module.exports = auth_guard;
