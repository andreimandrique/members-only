const express = require("express");
const loginRouter = express.Router();

const loginController = require("../controllers/loginController");

loginRouter.get("/", loginController.loginGet);
loginRouter.post("/", loginController.loginPassport);

module.exports = loginRouter;
