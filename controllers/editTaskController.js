const db = require("../db/queries");

const { param, body, validationResult } = require("express-validator");

const validateTaskId = [
  param("taskId")
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage("Task Id must be a positive integer"),
];

exports.editTaskGet = [
  validateTaskId,
  async (req, res) => {
    const { taskId } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send("Invalid Task Id");
    }

    try {
      const task = await db.viewTask(taskId);
      res.render("editTask", { task: task[0] });
    } catch (error) {
      res.status(500).send("cannot get task");
    }
  },
];

const validateTask = [
  body("task").notEmpty().withMessage("Task cannot be empty"),
];

exports.editTaskPost = [
  validateTask,
  async (req, res) => {
    const { taskId } = req.params;
    const { task } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      try {
        const task = await db.viewTask(taskId);
        return res.render("editTask", {
          task: task[0],
          errors: errors.array(),
        });
      } catch (error) {
        return res.status(500).send("cannot get task");
      }
    }

    try {
      await db.updateTask(taskId, task);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("cannot edit task");
    }
  },
];
