const db = require("../db/queries");

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.signupGet = (req, res) => {
  res.render("signup");
};

const validateUser = [
  body("username").notEmpty().withMessage("Username cannot be empty"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password cannot be empty")
    .custom(async (value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Password and confirm password do not match");
      }
    }),
  body("fullName").notEmpty().withMessage("Fullname cannot be empty"),
];

exports.signupPost = [
  validateUser,
  async (req, res) => {
    const { username, password, fullName, isAdminRole } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("signup", { errors: errors.array() });
    }

    const userRole = isAdminRole === "on" ? 1 : 2;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.addUser(username, hashedPassword, fullName, userRole);
      res.render("signup", { success: "Account registered successfully" });
    } catch (error) {
      res.render("signup", {
        errors: [{ msg: "Username already exists" }],
      });
    }
  },
];
