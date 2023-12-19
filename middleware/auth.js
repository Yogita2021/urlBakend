const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(201).json({ msg: "Login first" });
    }
    let decode = jwt.verify(token, process.env.secreteKey);

    if (!decode) {
      return res.status(404).json({ msg: "Unauthorized" });
    }
    console.log(decode);
    req.user = decode.userId;
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
module.exports = { auth };
