const db = require("../db/queries");

const { body, validationResult } = require("express-validator");

exports.editTaskGet = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await db.viewTask(taskId);
    return res.render("editTask", { task: task[0] });
  } catch (error) {
    return res.status(500).send("cannot get task");
  }
};

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
      return res.status(500).send("cannot edit task");
    }
  },
];
