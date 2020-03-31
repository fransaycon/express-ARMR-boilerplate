import express from "express";
import indexRouter from "./routes";
import config from "./config";

const server = express();
server.use(`/`, indexRouter);

server.listen(config.PORT, () => {
  console.log(`Running at http://localhost:${config.PORT}!`);
});

export default server;
