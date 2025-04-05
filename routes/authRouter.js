const { Router } = require("express");
const authController = require("../controllers/authController");
const passport = require("passport");
const authRouter = Router();

authRouter.get("/signup", authController.signupGet);
authRouter.post("/signup", authController.signupPost);
authRouter.get("/login", authController.loginGet);
authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

module.exports = authRouter;
