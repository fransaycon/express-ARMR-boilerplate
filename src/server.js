import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth';
import protectedRouter from './routes/protected';
import config from './config';
import connectDb from './lib/connect-db';
import errorMiddleware from './middlewares/error';

const server = express();

server.use(bodyParser.json());
server.use(cookieParser());
server.use('/', authRouter);
server.use('/protected', protectedRouter);
server.use(errorMiddleware);

const startServer = async () => {
  await connectDb();
  server.listen(config.PORT);
};

startServer();
