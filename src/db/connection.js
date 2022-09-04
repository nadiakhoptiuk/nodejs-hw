const mongoose = require("mongoose");

async function connectionToDB() {
  return mongoose.connect(process.env.DB_HOST, {
    dbName: process.env.MONGODB_NAME,
  });
}

module.exports = { connectionToDB };
