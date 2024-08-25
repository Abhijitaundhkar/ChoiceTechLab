const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized No token provided Please login" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_key);
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Unauthorized No token Please login" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized No token Please login" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("protectRoute error", error);
    res.status(500).json({ error: "Check error " });
  }
};

module.exports = { protect };
