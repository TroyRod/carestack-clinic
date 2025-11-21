// config/config.js

import dotenv from "dotenv";
dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "SUPER_SECRET_JWT_KEY",
  mongoUri: process.env.MONGODB_URI,   // IMPORTANT: must match .env
};

export default config;
