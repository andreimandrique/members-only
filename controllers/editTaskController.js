const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

exports.editTaskGet = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await db.getTask(taskId);
    return res.render("editTask", { task: task[0] });
  } catch (error) {
    return res.status(500).send("cannot edit task");
  }
};

const validateTask = [
  body("task").notEmpty().withMessage("Task cannot be empty"),
];

exports.editTaskPost = async (req, res) => {
  const { taskId } = req.params;
  const { task } = req.body;

  console.log(taskId);
  console.log(task);
};
