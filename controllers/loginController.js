const passport = require("../auth");

exports.loginGet = (req, res) => {
  res.render("login");
};

// exports.loginPost = passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/error",
// });
