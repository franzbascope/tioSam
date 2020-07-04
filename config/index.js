require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  adminName: process.env.AUTH_NAME,
  adminPassword: process.env.AUTH_PASSWORD,
  adminEmail: process.env.AUTH_EMAIL,
};
module.exports = { config };
