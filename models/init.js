const mongoose = require("mongoose");
const configValues = require("../config/constants");

function init() {
  var url = configValues.dbURL;

  mongoose.connect(
    url,
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
      if (err) {
        console.error("Error! " + err);
      } else {
        console.log("Connected to mongodb");
      }
    }
  );

  mongoose.connection.on("error", function (err) {
    console.log("Connection error: " + err);
  });
  mongoose.connection.on("open", function () {
    console.log("connected to mongo db");
  });
}

module.exports = init;
