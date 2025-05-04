const { body, validationResult} = require("express-validator");
const { authMiddleware } = require("../middleware/authMiddleware");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const wrongError = "Wrong password.";

const passwordValidator = [
  body("password").equals("bruno123").withMessage(wrongError).escape(),
];

exports.getAdminIndex= [
  authMiddleware,
  async (req, res) => {
    if (req.user.is_admin) {
      res.redirect("/messages");
    }

    res.render("admin/index", {
      title: "Become an admin",
    });
  },
];

exports.getAdminSuccess= [
  authMiddleware,
  async (req, res) => {
    if (!req.user.is_admin) {
      res.redirect("/membership");
    }

    res.render("admin/success", {
      title: "Success",
    });
  },
];

exports.adminPost = [
  authMiddleware,
  passwordValidator,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (req.user.is_admin) {
      res.redirect("/messages");
    }

    if (!errors.isEmpty()) {
      return res.status(400).render("admin/index", {
        title: "Become an admin",
        errors: errors.array(),
      });
    }

    db.setAdminToId(req.user.id)
    res.redirect("admin/success")
  }),
];
