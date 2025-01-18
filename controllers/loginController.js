const passport = require("../auth");

exports.loginGet = (req, res) => {
  res.render("login");
};

exports.loginPassport = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});
