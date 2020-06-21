const mongoose = require("mongoose");
const { config } = require("../config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbUser);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://${config.dbHost}:27017/${DB_NAME}`;

const connectMongo = () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // Get Mongoose to use the global promise library
  mongoose.Promise = global.Promise;
  //Get the default connection
  const db = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
};

module.exports = connectMongo;
