const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  //user schema
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
    required: "Email address is required",
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
});

userSchema.statics.findByemail = function (email, cb) {
  return this.find(
    {
      email: email,
    },
    cb
  );
};

var users = mongoose.model("users", userSchema, "users");

const saveUser = function (user, cb) {
  bcrypt.hash(user.password, 2, function (err, hash) {
    // Store hash in your password DB.
    let newUser = new users({
      password: hash,
      email: user.email,
      name: user.name,
    });
    newUser.save(function (err, data) {
      data = data.toJSON();
      delete data["password"];
      cb(err, data);
    });
  });
};

const findUser = function (user, cb) {};

const updateUser = function (user, cb) {};

const validateUserCredentials = function (user, cb) {
  users.findByemail(user.email, function (err, data) {
    if (data.length == 0) {
      cb("user not present", null);
    } else {
      let userFromDB = data[0].toJSON();
      bcrypt.compare(user.password, userFromDB.password, function (
        err,
        isMatch
      ) {
        if (err) {
          return cb(err, null);
        } else if (isMatch) {
          delete userFromDB["password"];
          cb(null, userFromDB);
        } else {
          cb("Authentication Failed", null);
        }
      });
    }
  });
};

const getUsers = function (cb) {};

module.exports = {
  saveUser: saveUser,
  findUser: findUser,
  getUsers: getUsers,
  updateUser: updateUser,
  validateUserCredentials: validateUserCredentials,
};
