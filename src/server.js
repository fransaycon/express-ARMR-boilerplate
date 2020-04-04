import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/auth';
import config from './config';
import connectDb from './lib/connect-db';

const server = express();

server.use(bodyParser.json());
server.use('/', authRouter);

const startServer = async () => {
  await connectDb();
  server.listen(config.PORT);
};

startServer();
