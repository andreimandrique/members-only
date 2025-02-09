const db = require("../db/queries");

exports.deleteTaskPost = async (req, res) => {
  const { taskId } = req.params;

  try {
    await db.deleteTask(taskId);
    res.redirect("/");
  } catch (error) {
    return res.status(500).send("cannot delete task");
  }
};
