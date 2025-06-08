const express = require("express");
const {
  addTask,
  removeTask,
  getAlltask,
} = require("../controllers/taskController"); //Destructure all exports once

const validateTask = require("../validators/taskValidator");

const router = express.Router();

// POST /api/tasks
router.post("/", validateTask, addTask);

// GET /api/tasks
router.get("/", getAlltask);

// DELETE /api/tasks/:id
router.delete("/:id", removeTask);

module.exports = router;
