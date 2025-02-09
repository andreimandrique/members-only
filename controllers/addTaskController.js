const db = require("../db/queries");

const { body, validationResult } = require("express-validator");

exports.addTaskGet = (req, res) => {
  res.render("addTask");
};

const validateTask = [
  body("task").notEmpty().withMessage("Task cannot be empty"),
];

exports.addTaskPost = [
  validateTask,
  async (req, res) => {
    const userId = req.user.user_id;
    const { task } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("addtask", { errors: errors.array() });
    }

    try {
      await db.addTask(userId, task);
      res.render("addtask", { success: "Task added successfully" });
    } catch (error) {
      res.status(500).send("An error occurred while adding the task.");
    }
  },
];
