const connectMongo = require("../lib/mongo");
const chalk = require("chalk");
const { config } = require("../config");

const resetDb = async () => {
  try {
    let db = connectMongo();
    await db.dropCollection("buys");
    await db.dropCollection("products");
    await db.dropDatabase();
    console.log(chalk.green(`Database dropped successfully`));
    db.close();
    process.exit(0);
  } catch (e) {
    console.log(chalk.red(`Error dropping db: ${e}`));
    process.exit(1);
  }
};

resetDb();
