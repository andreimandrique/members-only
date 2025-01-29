const express = require("express");
const adminRouter = express.Router();

const adminController = require("../controllers/adminController");

adminRouter.get("/", adminController.adminGet);

module.exports = adminRouter;
