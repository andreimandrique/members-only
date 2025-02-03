const express = require("express");
const employeeRouter = express.Router();

const employeeController = require("../controllers/employeeController");

employeeRouter.get("/", employeeController.employeeGet);

module.exports = employeeRouter;
