const db = require("../db/queries");

exports.addTaskGet = (req, res) => {
  const userId = req.params.userId;
  const currenUserId = String(`:${req.user.user_id}`);

  if (userId === currenUserId) {
    res.render("addtask");
  } else {
    res.status(401).send("Unauthorized");
  }
};

exports.addTaskPost = async (req, res) => {
  const { userId, task } = req.body;
  console.log(userId);
  try {
    await db.addTask(userId, task);
    res.render("addtask");
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
};
