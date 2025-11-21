// index.js

import mongoose from "mongoose";
import config from "./config/config.js";
import app from "./server/express.js";

console.log("Connecting to:", config.mongoUri);


mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose
  .connect(config.mongoUri, {
    // options optional in modern versions
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Handle DB errors
mongoose.connection.on("error", () => {
  throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});

// Start server
app.listen(config.port, (err) => {
  if (err) console.error(err);
  console.log(`Server is running on port ${config.port}`);
});
