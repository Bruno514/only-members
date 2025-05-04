const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { validPassword } = require("../lib/passwordUtils");
const db = require("../db/queries");

const verifyCallback = async (username, password, done) => {
  try {
    const user = await db.getUserByUsername(username);
    
    if (!user) {
      return done(null, false, {message: 'Invalid username.'});
    }
    const isValid = await validPassword(password, user.password);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false, {message: 'Invalid password.'});
    }
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});
