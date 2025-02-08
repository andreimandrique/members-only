const { formatDate } = require("date-fns");
const db = require("../db/queries");
const { param, body, validationResult } = require("express-validator");

const validateTaskId = [param("taskId").notEmpty().isNumeric()];

exports.editTaskGet = [
  validateTaskId,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send("invalid task id");
    }

    const { taskId } = req.params;

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
      const tasks = await db.viewAllTask();

      const tasksWithFormattedDate = tasks.map((task) => {
        const formattedDate = formatDate(task.created_at, "p PP");
        return { ...task, created_at: formattedDate };
      });

      return res.render("admin", {
        tasks: tasksWithFormattedDate,
        success: "Task edit successful",
      });
    } catch (error) {
      return res.status(500).send("cannot edit task");
    }
  },
];
