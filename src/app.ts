
import express, { Express, Request, Response } from "express";
const app: Express = express();
import morgan from "morgan";
import fs from "fs";
import winston from "winston";
import dotenv from "dotenv";
dotenv.config();
import originControl from "./middlewares/corsMiddleware";
import path from "path";
//  routes
import authRoutes from "./routes/auth";
import contactAndSkillRoutes from "./routes/contact.and.skill";
import eduAndExpRoutes from "./routes/education.and.experiences";
import projectAndDevRoutes from "./routes/project.and.development";


// 
const publicDir = path.join(__dirname, "public");
// just to ensure the public folder exists or create it, as after git push empty folder doesn't get pushed
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log("Public folder created.");
}

// Configure Winston logger
// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: "combined.log" }),
//   ],
// });

// need to organize how message format looks like
// app.use(
//   morgan("combined", {
//     stream: {
//       write: (message) => logger.info(message.trim()),
//     },
//   })
// );

// middlewares
app.use(express.json());
app.use(originControl);
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
//
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "I am functional !",
    data: null,
  });
});
//
app.use("/api/auth", authRoutes);
app.use("/api/contact-and-skill", contactAndSkillRoutes);
app.use(
  "/api/education-and-experience", eduAndExpRoutes
);
app.use(
  "/api/project-and-development", projectAndDevRoutes);
//
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;