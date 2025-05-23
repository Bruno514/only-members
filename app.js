require("dotenv").config();
const moment = require("moment");
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const pool = require("./db/pool");
const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const messageRouter = require("./routes/messageRouter");
const membershipRouter = require("./routes/membershipRouter");
const adminRouter = require("./routes/adminRouter");

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

// Set user variable for use in EJS templates and inject momement lib
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.moment = moment;
  next();
});

// Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/messages", messageRouter);
app.use("/membership", membershipRouter);
app.use("/admin", adminRouter);

// Missing routes forwarder
app.use("*", (req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status)
    .render("error", { title: `Error ${err.status}`, error: err });
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
