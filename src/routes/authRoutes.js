const express = require("express");
const {
  registerUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUserById,
  loginUser,
  logoutUser,
} = require("../controller/authController");
const { checkRole } = require("../middleware/roleMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//all register and login routes
router.post("/signup", registerUser);
router.put("/updateUser/:id", protect, updateUser);
router.delete("/removeUser/:id", protect, checkRole(["admin"]), deleteUser);
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);

module.exports = router;
