const express = require("express");
const {
  registerUser,
  updateUser,
  deleteUser,
  getAllUser,
  loginUser,
  logoutUser,
} = require("../controller/authController");
const { checkRole } = require("../middleware/roleMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", registerUser);
router.put("/updateUser", updateUser);
router.delete("/removeUser/:id", protect, checkRole(["admin"]), deleteUser);
router.get("/", getAllUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
