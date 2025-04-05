const db = require("../db/queries");
const { authMiddleware } = require("../middleware/authMiddleware");

exports.indexGet = [
  authMiddleware,
  (req, res) => {
    res.render("index", {
      title: "Index Page",
    });
  },
];
