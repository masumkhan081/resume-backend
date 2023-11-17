const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const initDB = require("./src/data-tier/mongodb");
const { originControl } = require("./src/middleware/middlewares");

// initialize the database
initDB();

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "https://auth-full.vercel.app", credentials: true }));
app.use(originControl);
//


app.use("/contact-and-skill", require("./src/route/contact.and.skill"));
app.use(
  "/education-and-experience",
  require("./src/route/education.and.experiences")
);
app.use(
  "/project-and-development",
  require("./src/route/project.and.development")
);

// routes: login, register, recover, reset, verify, logout ...
app.use("/auth", require("./src/route/auth"));

app.listen(3000, () => {
  console.log("running ...");
});
