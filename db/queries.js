const pool = require("./pool");

exports.getUserByUsername = async (username) => {
  const { row } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return row[0];
};

exports.insertMessage = async (usernameId, title, text) => {
  await pool.query(
    `INSERT INTO messages (title, text, author) VALUES ($1, $2, $3)`,
    [title, text, usernameId]
  );
};

exports.insertUser = async (username, fullname, hashedPassword) => {
  await pool.query(
    "insert into users (username, fullname, password) values ($1, $2, $3)",
    [username, fullname, hashedPassword]
  );
};
