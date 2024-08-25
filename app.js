require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const redisClient = require("./src/config/redis");
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

app.use(cookieParser());
//extract json body
app.use(express.json());

//route middleware
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
//default route
app.use("*", (req, res) => {
  return res.status(400).json({ message: "Default or Wrong api called" });
});
const PORT = process.env.PORT || 5000;
//server run on port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`),
    //connect to mongo Db
    connectDB();
  redisClient;
});
