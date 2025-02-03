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
      res.render("signup", {
        errors: errors.array(),
      });
    } else {
      const { username, password, fullName } = req.body;
      try {
        await db.addUser(username, password, fullName);
        res.render("signup", {
          success: "Account successfull created",
        });
      } catch (error) {
        res.render("signup", {
          errors: [{ msg: "Username already exist" }],
        });
      }
    }
  },
];
