const { Company } = require("../../models/company");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const connectMongo = require("../../lib/mongo");

const companySeed = async () => {
  try {
    //database
    const db = connectMongo();
    //hash password
    await new Company({
      name: "El Rey de la Barba",
    }).save();
    await new Company({
      name: "Tio Sam Importaciones",
    }).save();
    console.log(chalk.green(`Company seed ran successfully`));
    db.close();
    process.exit(0);
  } catch (e) {
    console.log(chalk.red(`Error running company seed: ${e}`));
    process.exit(1);
  }
};

companySeed();
