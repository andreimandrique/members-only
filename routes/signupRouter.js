const express = require("express");
const signupRouter = express.Router();

const signupController = require("../controllers/signupController");

signupRouter.get("/", signupController.signupGet);
signupRouter.post("/", signupController.signupPost);

module.exports = signupRouter;
