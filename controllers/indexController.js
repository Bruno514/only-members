const db = require("../db/queries");
const { authMiddleware } = require("../middleware/authMiddleware");

exports.indexGet = [
  async (req, res) => {
    res.render("index", {
      title: "Index Page",
    });
  },
];
