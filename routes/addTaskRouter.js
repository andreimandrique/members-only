const express = require("express");
const addTaskRouter = express.Router();

const addTaskController = require("../controllers/addTaskController");
addTaskRouter.get("/", addTaskController.addTaskGet);
addTaskRouter.post("/", addTaskController.addTaskPost);

module.exports = addTaskRouter;
