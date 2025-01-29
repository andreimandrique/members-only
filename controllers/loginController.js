const passport = require("./authController");

exports.loginGet = (req, res) => {
  res.render("login");
};

exports.loginPassport = passport.authenticate("local", {
  failureRedirect: "/",
  successRedirect: "/",
});
