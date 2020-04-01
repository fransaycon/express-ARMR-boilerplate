import express from "express";
import indexRouter from "./routes";
import config from "./config";
import connectDb from "./lib/connect-db";

const server = express();
server.use(`/`, indexRouter);

const startServer = async () => {
  await connectDb();
  server.listen(config.PORT);
  console.log(`🚀 Server running at localhost:${config.PORT}`);
};

startServer();
