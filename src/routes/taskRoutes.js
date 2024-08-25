const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/taskController");
const { protect } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");

const router = express.Router();
//all routes of tasks
router.get("/", protect, getTasks);
router.post("/addTask", protect, createTask);
router.put("/updateTask/:id", protect, updateTask);
router.delete("/removeTask/:id", protect, checkRole(["admin"]), deleteTask);

module.exports = router;
