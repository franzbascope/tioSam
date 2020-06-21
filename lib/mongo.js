const { MongoClient } = require("mongodb");
const { config } = require("../config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbUser);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb:://${config.dbHost}:27017/?authSource=${DB_NAME}`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect((err) => {
        if (err) reject(err);
        console.log("Connected to db successfully");
        resolve(this.client.db(this.dbName));
      });
    });
  }
}
