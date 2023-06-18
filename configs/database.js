const mongoose = require("mongoose");

const { MONGO_URI } = process.env;
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
