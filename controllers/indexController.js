exports.indexGet = (req, res) => {
  if (req.user) {
    if (req.user.role == "admin") {
      console.log("admin");
    } else if (req.user.role == "employee") {
      console.log("employee");
    }
  }
  res.render("index");
};
