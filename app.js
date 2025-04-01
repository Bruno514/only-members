require("dotenv").config();
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const pool = require("./db/pool");
const authRouter = require("./routes/authRouter");

const PgStore = require("connect-pg-simple")(session);
require("./config/passport");

const PORT = process.env.PORT || 3000;

const app = express();
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

const sessionStore = new PgStore({ pool: pool });
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2,
    },
  })
);

app.use(passport.session());

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
