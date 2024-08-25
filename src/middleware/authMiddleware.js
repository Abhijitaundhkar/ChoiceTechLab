require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    //token is not present
    if (!token) {
      return res.status(401).json({ error: "Unauthorized No token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //unable to verify
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Unauthorized No token or Please login" });
    }
    //find user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized No token unable to find user Please login",
      });
    }
    req.user = user;
    //call next
    next();
  } catch (error) {
    console.log("protectRoute error", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { protect };
