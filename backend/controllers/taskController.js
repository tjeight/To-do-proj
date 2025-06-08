const Task = require("../models/task");

// Add Task
exports.addTask = async (req, res) => {
  try {
    const { task, date } = req.body;

    if (!task || !date) {
      return res.status(400).json({ error: "Task and date are required" });
    }

    const newTask = new Task({ task, date });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Remove Task by ID
exports.removeTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Tasks
exports.getAlltask = async (req, res) => {
  try {
    const allTasks = await Task.find({});

    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
