const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const initRoutes = require("./routes");
const bodyParser = require("body-parser");
const connectMongo = require("./lib/mongo");
const cors = require("cors");

const errorHandler = require("./middlewares/errorHandler");
const Boom = require("boom");

//database
connectMongo();

var app = express();

//middlewares
app.use(cors());
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
