const connectMongo = require("../lib/mongo");
const chalk = require("chalk");
const { config } = require("../config");

const resetDb = async () => {
  try {
    const DB_NAME = config.dbName;
    let db = connectMongo();
    console.log(db.name);
    debugger;
    console.log("models", db.models);
    console.log(chalk.green(`Database dropped successfully`));
    db.close();
    process.exit(0);
  } catch (e) {
    console.log(chalk.red(`Error dropping db: ${e}`));
    process.exit(1);
  }
};

resetDb();
