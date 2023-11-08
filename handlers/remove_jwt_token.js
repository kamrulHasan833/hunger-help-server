const remove_jwt_token = (req, res) => {
  res.clearCookie("jwt_token", {
    maxAge: 0,
  });
  res.send({ success: true });
};
module.exports = remove_jwt_token;
