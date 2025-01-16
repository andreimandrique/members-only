const pool = require("./pools");

async function addUser(username, password, full_name) {
  await pool.query(
    "INSERT INTO users (username, password, full_name) values($1, $2, $3)",
    [username, password, full_name]
  );
}

module.exports = {
  addUser,
};
