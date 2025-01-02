 
const cors = require("cors");
const express = require("express");
const httpStatus = require("http-status");
const RootRoutes = require("./src/root.route");
const fs = require("fs");
const path = require("path");
//
const morgan = require("morgan");
const winston = require("winston");
//

const app = express();




const allowedOrigins = ["http://localhost:3001", "http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
//

const publicDir = path.join(__dirname, "public");
// just to ensure the public folder exists or create it, as after git push empty folder doesn't get pushed
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log("Public folder created.");
}

//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
//
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "I am functional !",
    data: null,
  });
});

app.use("/api", RootRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API not found. For: ${req.originalUrl}`,
    data: null,
  });
  next();
});

module.exports = app;
