const { Storage } = require("../../models/storage");
const chalk = require("chalk");
const connectMongo = require("../../lib/mongo");

storageSeed = async () => {
  try {
    //database
    const db = connectMongo();
    await new Storage({
      name: "USA",
    }).save();
    await new Storage({
      name: "TRANSIT",
    }).save();
    await new Storage({
      name: "BO",
    }).save();
    console.log(chalk.green(`Storage seed ran successfully`));
    db.close();
    process.exit(0);
  } catch (e) {
    console.log(chalk.red(`Error running storage seed: ${e}`));
    process.exit(1);
  }
};

storageSeed();

module.exports = storageSeed;
