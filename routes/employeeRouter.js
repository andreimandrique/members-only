const express = require("express");
const employeeRouter = express.Router();

const employeeController = require("../controllers/employeeController");
const addTaskController = require("../controllers/addTaskController");

employeeRouter.get("/", employeeController.employeeGet);
employeeRouter.get("/addtask/:userId", addTaskController.addTaskGet);

module.exports = employeeRouter;
