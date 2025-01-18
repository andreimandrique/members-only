const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const session = require("express-session");
const passport = require("./auth");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");

app.use("/", indexRouter);
app.use("/sign-up", signupRouter);
app.use("/log-in", loginRouter);
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/failed",
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
