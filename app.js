var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const initRoutes = require("./routes");
const bodyParser = require("body-parser");
const connectMongo = require("./lib/mongo");

const errorHandler = require("./middlewares/errorHandler");
const Boom = require("boom");

//database
connectMongo();

var app = express();

//middlewares
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
initRoutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(Boom.notFound());
});

app.use(errorHandler);

module.exports = app;
