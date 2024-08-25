require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const redisClient = require("./src/config/redis");
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

connectDB();
redisClient.emit("connect");

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
