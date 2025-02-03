const express = require("express");
const addTaskRouter = express.Router();

const addTaskController = require("../controllers/addTaskController");
addTaskRouter.use("/", addTaskController.addTaskGet);

module.exports = addTaskRouter;
