const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

exports.addTaskGet = (req, res) => {
  res.render("addtask");
};

const validateTask = [
  body("task").notEmpty().withMessage("Task cannot be empty"),
];

exports.addTaskPost = [
  validateTask,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("addtask", { errors: errors.array() });
    } else {
      const userId = req.user.user_id;
      const { task } = req.body;
      try {
        await db.addTask(userId, task);
        res.render("addtask", {
          success: "Task added successfully",
        });
      } catch (error) {
        res.send(error);
      }
    }
  },
];
