const pool = require("./pool");

exports.getUserByUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return rows[0];
};

exports.getUserById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

  return rows[0];
};

exports.insertUser = async (username, fullname, hashedPassword) => {
  await pool.query(
    "INSERT INTO USERS (username, fullname, password) VALUES ($1, $2, $3)",
    [username, fullname, hashedPassword]
  );
};

exports.getAllMessages = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM messages m JOIN users u ON m.author = u.id"
  );

  return rows;
};

exports.getMessageById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM messages m JOIN users u ON m.author = u.id WHERE m.id = $1",
    [id]
  );

  return rows[0];
};

exports.insertMessage = async (usernameId, title, text) => {
  await pool.query(
    `INSERT INTO messages (title, text, author) VALUES ($1, $2, $3)`,
    [title, text, usernameId]
  );
};

exports.setMembershipToId = async (usernameId) => {
  await pool.query("UPDATE users SET membership_status = True WHERE id = $1", [
    usernameId,
  ]);
};
