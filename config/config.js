// config/config.js

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// DEBUG — confirm file is loading
console.log("DEBUG MONGO_URI:", process.env.MONGO_URI);

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "SUPER_SECRET_JWT_KEY",
  mongoUri: process.env.MONGO_URI,  // MUST MATCH .env EXACTLY
};

export default config;
