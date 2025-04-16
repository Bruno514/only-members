const { body, validationResult } = require("express-validator");
const { genPassword } = require("../lib/passwordUtils");
const passport = require("passport");
const db = require("../db/queries");

const signupValidator = [
  body("password").isLength({ min: 5 }).withMessage("Password too short"),
  body("passwordConfirmation")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

exports.signupGet = (req, res) => {
  res.render("auth/signup");
};

exports.signupPost = [
  signupValidator,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        title: "Invalid fields, try again",
        errors: errors.array(),
      });
    }

    const { username, fullname, password } = req.body;

    try {
      const hashedPassword = await genPassword(password);

      db.insertUser(username, fullname, hashedPassword);

      res.redirect("/messages");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
];

exports.loginGet = (req, res) => {
  res.render("auth/login");
};

exports.loginPost = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/auth/login",
  })(req, res, next);
};

exports.logoutGet = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");
  });
};
