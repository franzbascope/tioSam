const mongoose = require("mongoose");
const { config } = require("../config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const DB_HOST = config.dbHost;
let MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

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
  return db;
};

module.exports = connectMongo;
