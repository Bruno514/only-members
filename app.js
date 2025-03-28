require("dotenv").config();
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const bcryptjs = require("bcryptjs");
const passport = require("passport");
const pool = require("./db/pool");
const indexRouter = require("./routes/indexRouter");

const PgStore = require("connect-pg-simple")(session);
require("./lib/passport");

const PORT = process.env.PORT || 3000;

const app = express();
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
