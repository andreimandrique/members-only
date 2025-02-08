const express = require("express");
const editTaskRouter = express.Router();

const editTaskController = require("../controllers/editTaskController");

editTaskRouter.get("/:taskId", editTaskController.editTaskGet);
editTaskRouter.post("/:taskId", editTaskController.editTaskPost);

module.exports = editTaskRouter;
