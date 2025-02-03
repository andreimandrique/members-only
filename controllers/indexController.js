const passport = require("./authController");

exports.indexGet = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.role === "admin") {
      res.redirect("/admin");
    } else if (req.user.role === "employee") {
      res.redirect("/employee");
    }
  } else {
    res.render("index");
  }
};

exports.indexPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
  failureFlash: true,
});
