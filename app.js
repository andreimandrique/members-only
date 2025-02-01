const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(flash());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");
const logoutRouter = require("./routes/logoutRouter");
const adminRouter = require("./routes/adminRouter");
const employeeRouter = require("./routes/employeeRouter");

const showInfo = require("./middlewares/showInfo");
const isLoggedIn = require("./middlewares/isLoggedIn");
const isAdmin = require("./middlewares/isAdmin");
const isEmployee = require("./middlewares/isEmployee");

app.use(showInfo);
app.use("/", indexRouter);
app.use("/sign-up", signupRouter);
app.use("/log-in", loginRouter);
app.use("/log-out", logoutRouter);

app.use("/admin", isLoggedIn, isAdmin, adminRouter);
app.use("/employee", isLoggedIn, isEmployee, employeeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
