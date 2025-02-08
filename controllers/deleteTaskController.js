const db = require("../db/queries");

const { formatDate } = require("date-fns");
const { param, body, validationResult } = require("express-validator");

const validateTaskId = [param("taskId").notEmpty().isNumeric()];

exports.deleteTaskPost = [
  validateTaskId,
  async (req, res) => {
    const { taskId } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send("invalid task id");
    }

    try {
      await db.deleteTask(taskId);

      const tasks = await db.viewAllTask();
      const tasksWithFormattedDate = tasks.map((task) => {
        const formattedDate = formatDate(task.created_at, "p PP");
        return { ...task, created_at: formattedDate };
      });

      return res.render("admin", {
        tasks: tasksWithFormattedDate,
        success: "Task delete successful",
      });
    } catch (error) {
      return res.status(500).send("cannot delete task");
    }
  },
];
