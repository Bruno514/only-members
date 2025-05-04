const { body, validationResult } = require("express-validator");
const { genPassword } = require("../lib/passwordUtils");
const passport = require("passport");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { options } = require("pg/lib/defaults");

const signupValidator = [
  body("fullname"),
  body("username"),
  body("password").isLength({ min: 5 }).withMessage("Password too short"),
  body("passwordConfirmation")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

exports.signupGet = (req, res) => {
  res.render("auth/signup", { title: "Sign up" });
};

exports.signupPost = [
  signupValidator,
  asyncHandler(async (req, res, next) => {
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
  }),
];

exports.loginGet = (req, res) => {
  if (req.session.messages) {
    res.render("auth/login", {
      title: "Login",
      errors: [req.session.messages[req.session.messages.length - 1]],
    });
  } else {
    res.render("auth/login", {
      title: "Login",
    });
  }
};

exports.loginPost = [
  passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
];

exports.logoutGet = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");
  });
};
