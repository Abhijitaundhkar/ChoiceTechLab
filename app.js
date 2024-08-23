require("dotenv").config();
const express = require("express");
const { connectDb } = require("./dbConnection/dbconfig");
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Default route");
});

app.listen(port, async (req, res) => {
  console.log(`Server started on http://localhost${port}`);
  connectDb();
});
