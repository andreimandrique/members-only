const pool = require("./pools");

async function addUser(username, password, full_name, role_id) {
  await pool.query(
    "INSERT INTO users (username, password, full_name, role_id) Values($1, $2, $3, $4)",
    [username, password, full_name, role_id]
  );
}

async function addTask(userId, task) {
  await pool.query("INSERT INTO tasks (owner_id, task) VALUES ($1, $2)", [
    userId,
    task,
  ]);
}

async function viewAllTask() {
  const { rows } = await pool.query(
    "SELECT owner_id, task_id, task,created_at ,full_name FROM tasks t JOIN users u ON t.owner_id = u.user_id ;"
  );
  return rows;
}

async function viewTask(taskId) {
  const { rows } = await pool.query(
    "SELECT owner_id, task_id, task,created_at ,full_name FROM tasks t JOIN users u ON t.owner_id = u.user_id WHERE task_id = $1;",
    [taskId]
  );
  return rows;
}

async function updateTask(taskId, task) {
  await pool.query("UPDATE tasks SET task = $2 WHERE task_id = $1;", [
    taskId,
    task,
  ]);
}

async function deleteTask(taskId) {
  await pool.query("DELETE FROM tasks WHERE task_id = $1;", [taskId]);
}

async function viewOwnTask(userId) {
  const { rows } = await pool.query(
    "SELECT owner_id, task_id, task,created_at ,full_name FROM tasks t JOIN users u ON t.owner_id = u.user_id WHERE user_id = $1;",
    [userId]
  );
  return rows;
}

module.exports = {
  addUser,
  addTask,
  viewAllTask,
  viewTask,
  updateTask,
  deleteTask,
  viewOwnTask,
};
