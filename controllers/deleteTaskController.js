const db = require("../db/queries");

const { param, validationResult } = require("express-validator");

const validateTaskId = [
  param("taskId")
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage("Task Id must be a positive integer"),
];

exports.deleteTaskPost = [
  validateTaskId,
  async (req, res) => {
    const { taskId } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send("Invalid Task Id");
    }

    try {
      await db.deleteTask(taskId);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("cannot delete task");
    }
  },
];
