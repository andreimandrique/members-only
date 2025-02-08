const db = require("../db/queries");

const { formatDate } = require("date-fns");
const { param, body, validationResult } = require("express-validator");

const validateTaskId = [param("taskId").notEmpty().isNumeric()];

exports.editTaskGet = [
  validateTaskId,
  async (req, res) => {
    const { taskId } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send("invalid task id");
    }

    try {
      const task = await db.viewTask(taskId);
      return res.render("editTask", { task: task[0] });
    } catch (error) {
      return res.status(500).send("cannot edit task");
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
        return res.status(500).send("cannot edit task");
      }
    }

    try {
      await db.updateTask(taskId, task);

      const myTask = await db.viewTask(taskId);
      return res.render("editTask", {
        task: myTask[0],
        success: "Task edit successful",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("cannot edit task");
    }
  },
];
