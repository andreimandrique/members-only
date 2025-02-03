const pool = require("./pools");

async function addUser(username, password, full_name) {
  await pool.query(
    "INSERT INTO users (username, password, full_name) Values($1, $2, $3)",
    [username, password, full_name]
  );
}

async function addTask(userId, task) {
  await pool.query("INSERT INTO tasks (owner_id, task) VALUES ($1, $2)", [
    userId,
    task,
  ]);
}

module.exports = {
  addUser,
  addTask,
};
