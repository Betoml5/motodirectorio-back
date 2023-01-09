require("dotenv").config();

const config = {
  port: process.env.PORT || 3030,
  stripeKey: process.env.STRIPE_KEY,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  authJwtSecret: process.env.JWT_SECRET,
};

module.exports = { config };
