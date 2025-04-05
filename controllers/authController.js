const { body, validationResult } = require("express-validator");
const { genPassword } = require("../lib/passwordUtils");
const pool = require("../db/pool");

const signupValidator = [
  body("password").isLength({ min: 5 }).withMessage("Password too short"),
  body("passwordConfirmation")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

exports.signupGet = (req, res) => {
  res.render("signup");
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
      await pool.query(
        "insert into users (username, fullname, password) values ($1, $2, $3)",
        [username, fullname, hashedPassword]
      );
      res.redirect("/");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
];

exports.loginGet = (req, res) => {
  res.render("login");
};
