const isAdmin = (req, res, next) => {
  if (req.user.role == "admin") {
    return next();
  }
  res.redirect("/");
};

module.exports = isAdmin;
