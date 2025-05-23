const db = require("../db/queries");
const { body } = require("express-validator");
const { authMiddleware } = require("../middleware/authMiddleware");
const asyncHandler = require("express-async-handler");

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

exports.getMessageIndex = [
  authMiddleware,
  asyncHandler(async (req, res) => {
    let messages = await db.getAllMessages();

    if (!req.user.membership_status && !req.user.is_admin) {
      messages = messages.map((msg) => {
        return { title: msg.title, text: msg.text };
      });
    }

    messages.reverse();

    res.render("messages/index", {
      title: "Messages",
      messages: messages,
      user: req.user,
    });
  }),
];

exports.postMessage = [
  messageValidator,
  asyncHandler(async (req, res) => {
    if (req.user.membership_status) {
      const { text, title } = req.body;
      await db.insertMessage(req.user.id, title, text);
    }

    res.redirect("/messages");
  }),
];

exports.deleteMessage = [
  asyncHandler(async (req, res) => {
    if (req.user.is_admin) {
      const { id } = req.params;
      console.log(id)
      await db.deleteMessage(id);
    }
    console.log(3)

    res.redirect("/messages");
  }),
];
