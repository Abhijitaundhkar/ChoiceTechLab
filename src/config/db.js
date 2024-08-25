const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    //connect db using URI
    const res = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected", res.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
