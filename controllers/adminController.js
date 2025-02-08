const { formatDate } = require("date-fns");
const db = require("../db/queries");

exports.adminGet = async (req, res) => {
  try {
    const tasks = await db.viewAllTask();

    const newTasks = tasks.map((task) => {
      const formattedDate = formatDate(task.created_at, "p PP");
      return { ...task, created_at: formattedDate };
    });

    res.render("admin", { tasks: newTasks });
  } catch (error) {
    res.status(500).send("Error fetching tasks");
  }
};
