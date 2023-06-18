// importing all the env variables
require("dotenv").config();
// importing express library
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const { PORT, SESSION_SECRET } = process.env;
const session = require("express-session");
const db = require("./configs/database");
const MongoStroe = require("connect-mongo")(session);
const projectRoute = require("./routers/project");
const issueRoute = require("./routers/issue");
// const issueRoute = require("./routers/issue");
const app = express();

//++++++++++++++++ MIDDLEWARES ++++++++++++++++//
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressEjsLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(
  session({
    name: "issue_tracker",
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    store: new MongoStroe({
      mongooseConnection: db,
      autoRemove: true,
    }),
  })
);

app.use("/project", projectRoute);
app.use("/issue", issueRoute);

app.listen(PORT, () => {
  console.log(`Server Pool at http://localhost:${PORT}`);
});
