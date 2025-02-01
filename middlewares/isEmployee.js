const isEmployee = (req, res, next) => {
  if (req.user.role == "employee") {
    return next();
  }
  res.redirect("/");
};

module.exports = isEmployee;
