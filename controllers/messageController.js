const db = require("../db/queries");
const { authMiddleware } = require("../middleware/authMiddleware");

exports.getMessageNew = [
  authMiddleware,
  (req, res) => {
    res.render("messages/new", {
      title: "New message",
    });
  },
];
