const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const generateToken = require("../config/jwt");

exports.getAllUser = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const userExists = await User.find({}, page, offset);

    if (userExists) {
      return res.status(200).json({ data: userExists });
    }
  } catch (error) {
    return res.status(200).json({ err: error.message });
  }
};
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    // if (!username || !email || !password) {
    //   return res.status(400).json({ message: "add all required fields" });
    // }
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassWord = await bcryptjs.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashPassWord,
      role,
    });
    if (user) {
      res.status(201).json({
        message: "User Register successfully",
        _id: user._id,
        username: user.username,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.findById(req.params._id);
    const hashPassword = password
      ? await bcryptjs.hash(password, 10)
      : user.password;
    console.log(hashPassword);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.password = hashPassword;

      const updatedUsers = await user.save();
      res.status(201).json({
        message: "User Updated successfully",
        updatedUsers,
      });
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const userExists = await User.findOneAndDelete(req.params._id);
    if (userExists) {
      res.status(201).json({
        message: "User delete successfully",
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || " "
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "invalid user email or password" });
    }

    res.status(201).json({
      message: "Login successfully",
      _id: user._id,
      username: user.username,
      token: generateToken(user._id, res),
    });
  } catch (error) {
    console.log("login error", error);
    return res.status(500).json({ "login error": error.message });
  }
};

exports.logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout sucessfully" });
  } catch (error) {
    console.log("logout error", error);
    return res.status(500).json({ "logout error": error.message });
  }
};
