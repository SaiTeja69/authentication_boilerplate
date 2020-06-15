var router = require("express").Router;
var jwt = require("../middlewares/jwt");
const UserDB = require("../models/users");
const util = require("../util/util");
module.exports = {
  register: router().post("/", function (req, res, next) {
    if (!req.body.email || !req.body.password || !req.body.name) {
      res.json(util.Failure("Invalid email, password or name"));
    } else {
      req.body.email = req.body.email.toLowerCase();
      UserDB.saveUser(req.body, (err, data) => {
        if (err) {
          // res.json(util.Failure(err.errmsg));
          res.send(util.Failure("user already present"));
        } else {
          res.send(util.Success(data, "user registered successfully"));
        }
      });
    }
  }),
  login: router().post("/", function (req, res, next) {
    if (!req.body.email || !req.body.password) {
      res.json(util.Failure("Invalid email or password"));
    } else {
      req.body.email = req.body.email.toLowerCase();
      UserDB.validateUserCredentials(req.body, (err, data) => {
        if (err) {
          res.send(util.Failure(err));
        } else {
          console.log(data);
          jwt.generateToken(data, function (token) {
            data["token"] = token;
            res.send(util.Success(data, "user login success"));
          });
        }
      });
    }
  }),

  logout: router().post("/", function (req, res, next) {}),

  resetPassword: router().get("/:email", (req, res, next) => {}),

  resetPasswordValidate: router().get("/:token", (req, res, next) => {}),

  resetPasswordUpdate: router().post("/", (req, res, next) => {}),

  verifyUserEmail: router().get("/:id", (req, res, next) => {
    console.log(" i am here", req.params.id);
  }),
};
