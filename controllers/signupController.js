const db = require("../db/queries");

exports.signupGet = (req, res) => {
  res.render("signup");
};

exports.signupPost = async (req, res) => {
  const { username, password, fullName } = req.body;
  try {
    await db.addUser(username, password, fullName);
    res.redirect("/sign-up");
  } catch (error) {
    res.status(500).send("cannot add user");
  }
};
