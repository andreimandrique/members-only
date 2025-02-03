const express = require("express");
const adminRouter = express.Router();

const adminController = require("../controllers/adminController");
const addTaskController = require("../controllers/addTaskController");

adminRouter.get("/", adminController.adminGet);
adminRouter.get("/addtask/:userId", addTaskController.addTaskGet);
adminRouter.post("/addtask/:userId", addTaskController.addTaskPost);

module.exports = adminRouter;
