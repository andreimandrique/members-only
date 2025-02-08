const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

exports.signupGet = (req, res) => {
  res.render("signup");
};

const validateUser = [
  body("username").notEmpty().withMessage("Username cannot be empty"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
  body("fullName").notEmpty().withMessage("Fullname cannot be empty"),
];

exports.signupPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("signup", { errors: errors.array() });
    }

    const { username, password, fullName, isAdminRole } = req.body;

    const userRole = isAdminRole === "on" ? 1 : 2;

    try {
      await db.addUser(username, password, fullName, userRole);
      return res.render("signup", { success: "Account successfully created" });
    } catch (error) {
      return res.render("signup", {
        errors: [{ msg: "Username already exists" }],
      });
    }
  },
];
