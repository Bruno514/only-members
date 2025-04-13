const db = require("../db/queries");
const { authMiddleware } = require("../middleware/authMiddleware");

exports.indexGet = [
  authMiddleware,
  async (req, res) => {
    if (!req.user.membership_status) {
      messages = messages.map((msg) => {
        msg.title, msg.text;
      });
    }
    res.render("index", {
      title: "Index Page",
      messages: await db.getAllMessages(),
    });
  },
];
