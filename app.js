var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var jwt = require("./middlewares/jwt");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var db = require("./models/init");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//initialize db
db();

app.use("/api", jwt.validate);

app.use("/", indexRouter);
app.use("/register", authRouter.register);
app.use("/login", authRouter.login);
app.use("/resetPassword", authRouter.resetPassword);
app.use("/resetPasswordValidate", authRouter.resetPasswordValidate);
app.use("/resetPasswordUpdate", authRouter.resetPasswordUpdate);
app.use("/verifyUser", authRouter.verifyUserEmail);

app.use("/api/logout", authRouter.logout);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
