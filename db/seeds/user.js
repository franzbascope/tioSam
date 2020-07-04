const { User } = require("../../models/user");
const { config } = require("../../config");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const connectMongo = require("../../lib/mongo");

const userSeeds = () => {
  connectMongo();
  try {
    new User({
      name: config.adminName,
      email: config.adminEmail,
      password: bcrypt.hash(config.adminPassword),
    }).save();
    console.log(chalk.green(`User seeds ran successfully`));
    process.exit(0);
  } catch (e) {
    console.log(chalk.red(`Error creating user: ${e}`));
    process.exit(1);
  }
};

userSeeds();
