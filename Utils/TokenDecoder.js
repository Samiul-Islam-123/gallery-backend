const jwt = require("jsonwebtoken");

const DecodeToken = async (token) => {
  const decoded = await jwt.verify(token, process.env.SECRET);
  return decoded
};
module.exports = DecodeToken;
