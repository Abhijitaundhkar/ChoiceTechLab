const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    //add pagination for large data
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const tasks = await Task.find().skip(offset).limit(parseInt(limit));
    const totalTask = await Task.countDocuments();
    res.json({
      data: tasks,
      currentPage: page,
      totalPages: Math.ceil(totalTask / limit),
      totalTask: totalTask,
    });
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    //if (!title) return res.status(400).json({ message: "title is required" });
    const result = await Task.findOne({ title });
    if (result) {
      res.status(400).json({ message: "Already Task Present" });
    }
    const task = new Task({
      title,
      description,
      completed,
      user: req.user._id,
    });

    const createdTask = await task.save();
    return res.status(201).json(createdTask);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.completed = req.body.completed || task.completed;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    //find task and delete
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task) {
      res.json({ message: "Task removed" });
    } else {
      return res.status(404).json({ message: "Task OR ID Not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
