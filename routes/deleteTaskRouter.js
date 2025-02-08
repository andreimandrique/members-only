const express = require("express");
const deleteTaskRouter = express.Router();
const deleteTaskController = require("../controllers/deleteTaskController");

deleteTaskRouter.post("/:taskId", deleteTaskController.deleteTaskPost);

module.exports = deleteTaskRouter;
