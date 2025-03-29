const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use(flash());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");
const logoutRouter = require("./routes/logoutRouter");
const demoRouter = require("./routes/demoRouter");

const adminRouter = require("./routes/adminRouter");
const employeeRouter = require("./routes/employeeRouter");
const addTaskRouter = require("./routes/addTaskRouter");
const editTaskRouter = require("./routes/editTaskRouter");
const deleteTaskRouter = require("./routes/deleteTaskRouter");

const showCurrentUser = require("./middlewares/showCurrentUser");
const isLoggedIn = require("./middlewares/isLoggedIn");
const isAdmin = require("./middlewares/isAdmin");
const isEmployee = require("./middlewares/isEmployee");

app.use("/", indexRouter);
app.use("/sign-up", signupRouter);
app.use("/log-out", logoutRouter);
app.use("/demo", demoRouter);

app.use(showCurrentUser);

app.use("/add-task", isLoggedIn, addTaskRouter);
app.use("/admin", isLoggedIn, isAdmin, adminRouter);
app.use("/edit-task", isLoggedIn, isAdmin, editTaskRouter);
app.use("/delete-task", isLoggedIn, isAdmin, deleteTaskRouter);
app.use("/employee", isLoggedIn, isEmployee, employeeRouter);

app.get("*", (req, res) => {
  res.status(404).send("Not found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(err);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
