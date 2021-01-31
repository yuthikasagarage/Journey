const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new HttpError("Authentication Error", 401);
    }
    const decoded = jwt.verify(token, "super_secret");

    req.userData = { userId: decoded.userId };

    next();
  } catch (err) {
    err = new HttpError("Authentication Error", 401);
    return next();
  }
};
