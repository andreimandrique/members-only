const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

<<<<<<< HEAD
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
=======
const session = require("express-session");
const passport = require("passport");

app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
>>>>>>> parent of b19fa58 (fix login)

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

<<<<<<< HEAD
app.use(express.urlencoded({ extended: true }));
=======
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
>>>>>>> parent of b19fa58 (fix login)

const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");

app.use("/", indexRouter);
app.use("/sign-up", signupRouter);
app.use("/log-in", loginRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
