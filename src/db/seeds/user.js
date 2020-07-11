const { User } = require("../../models/user");
const { config } = require("../../config");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const connectMongo = require("../../lib/mongo");

const userSeeds = async () => {
  try {
    //database
    connectMongo();
    //hash password
    const hashedPassword = await bcrypt.hash(config.adminPassword, 10);
    let newUser = new User({
      name: config.adminName,
      email: config.adminEmail,
      password: hashedPassword,
    });
    newUser = await newUser.save();
    console.log(chalk.green(`User seeds ran successfully,id: ${newUser._id}`));
    process.exit(0);
  } catch (e) {
    console.log(chalk.red(`Error creating user: ${e}`));
    process.exit(1);
  }
};

userSeeds();
