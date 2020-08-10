require("dotenv").config();

const config = {
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  authJWT: process.env.AUTH_JWT_SECRET,
  adminName: process.env.AUTH_NAME,
  adminPassword: process.env.AUTH_PASSWORD,
  adminEmail: process.env.AUTH_EMAIL,
};
module.exports = { config };
