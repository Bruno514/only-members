const { body, validationResult} = require("express-validator");
const { authMiddleware } = require("../middleware/authMiddleware");
const db = require("../db/queries");

const wrongError = "Wrong answer.";

const answerValidator = [
  body("answer").equals("boolean").withMessage(wrongError).escape(),
];

exports.getMembershipIndex = [
  authMiddleware,
  async (req, res) => {
    if (req.user.membership_status) {
      res.redirect("/messages");
    }

    res.render("membership/index", {
      title: "Become a member",
    });
  },
];

exports.getMembershipSuccess= [
  authMiddleware,
  async (req, res) => {
    if (!req.user.membership_status) {
      res.redirect("/membership");
    }

    res.render("membership/success", {
      title: "Success",
    });
  },
];

exports.membershipPost = [
  authMiddleware,
  answerValidator,
  async (req, res) => {
    const errors = validationResult(req)
    if (req.user.membership_status) {
      res.redirect("/messages");
    }

    if (!errors.isEmpty()) {
      return res.status(400).render("membership/index", {
        title: "Become a member",
        errors: errors.array(),
      });
    }

    db.setMembershipToId(req.user.id)
    res.redirect("membership/success")
  },
];
