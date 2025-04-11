const db = require("../db/queries");
const { body } = require("express-validator");
const { authMiddleware } = require("../middleware/authMiddleware");

const emptyError = "can not be empty";
const lengthError = "can not be too long";

const messageValidator = [
  body("title")
    .notEmpty()
    .withMessage(`Title ${emptyError}.`)
    .isLength({ max: 1023 })
    .withMessage(`Title ${lengthError}`)
    .escape(),
  body("text")
    .trim()
    .notEmpty()
    .withMessage(`Message text ${emptyError}.`)
    .isLength({ max: 1023 })
    .withMessage(`Message text ${lengthError}.`)
    .escape(),
];

exports.getMessageNew = [
  (req, res) => {
    res.render("messages/new", {
      title: "New message",
    });
  },
];

exports.postMessage = [
  messageValidator,
  async (req, res) => {
    const { text, title } = req.body;

    await db.insertMessage(req.user.id, title, text);

    res.redirect("/");
  },
];
