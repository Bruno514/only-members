exports.authMiddleware = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/auth/login");
  }
};