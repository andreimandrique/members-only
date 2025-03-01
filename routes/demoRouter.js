const express = require("express");
const demoRouter = express.Router();
const demoController = require("../controllers/demoController");

demoRouter.get("/", demoController.demoGet);

module.exports = demoRouter;
