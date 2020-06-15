var express = require("express");
var router = express.Router();
var User = require("../models/users");
const jwt = require("jsonwebtoken");

router.post("/update", function (req, res, next) {
  res.send("respond with a resource");
});

router.put("/add", function (req, res, next) {
  res.send("respond with a resource");
});

router.delete("/:id", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/", function (req, res, next) {
  console.log(req.usr);
  res.send(req.usr);
});

module.exports = router;
