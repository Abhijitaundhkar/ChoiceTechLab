const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const response = await mongoose.connect(`${process.env.mongoDb_URI}`);
    console.log(`Database connected successfully ${response.connection.host}`);
  } catch (error) {
    console.log("Error when connect to Db", error);
  }
};
module.exports = { connectDb };
