const jwt = require("jsonwebtoken");
const config = require("../config/constants");

exports.validate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        res.status(401);
        res.send("Invalid Token");
      } else {
        console.log(decoded, "at decoded");
        req.usr = decoded;
        next();
      }
    });
  } else {
    res.send("No token");
  }
};

exports.generateToken = (user, cb) => {
  console.log(user, "at jwt");
  const token = jwt.sign(user, config.secret);
  cb(token);
};
