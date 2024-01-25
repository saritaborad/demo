const jwt = require("jsonwebtoken");
const giveresponse = require("../utils/res_help");

const authenticate = (req, res, next) => {
 let token = req.cookies.token;
 if (!token) {
  return giveresponse(res, 403, false, "Not authorized, token missing");
 }

 try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.email = decoded.email;
  next();
 } catch (error) {
  return giveresponse(res, 403, false, error.message);
 }
};

module.exports = authenticate;
