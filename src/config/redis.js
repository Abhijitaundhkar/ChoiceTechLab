const redis = require("redis");
require("dotenv").config();

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on("connect", () => {
  console.log("Redis client connected");
});

client.on("error", (err) => {
  console.error("Redis connection error:", err);
});
client.emit("connect");

module.exports = client;
