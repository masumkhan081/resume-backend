import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import initDB from "./config/mongodb";
import config from "./config";
//
async function bootstrap() {
  const server = app.listen(config.port, async () => {
    console.log(`Server running on port ${config.port}`);
    // initialize the database
    initDB();
  });
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log("Server closed");
      });
    }
    process.exit(1);
  };
  const unexpectedErrorHandler = (error: Error) => {
    console.log(error);
    exitHandler();
  };
  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
}
bootstrap();
