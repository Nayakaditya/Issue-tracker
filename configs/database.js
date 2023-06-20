const mongoose = require("mongoose");

// Taking mondodb uri from environment vairable
const { MONGO_URI } = process.env;

// connecting with mongodb db
mongoose
  .connect(MONGO_URI, {
    maxPoolSize: 10,
    connectTimeoutMS: 5000,
    family: 4,
  })
  .then(() => {
    console.log("Database connnection succesful");
  })
  .catch((err) => {
    console.log(`Database connection error: ${err}`);
  });

const db = mongoose.connection;

module.exports = db;
