import express from 'express';
import { createServer } from 'http';
import socketIo from 'socket.io';
import cors from 'cors';
import winston, { Logger } from 'winston';
import HumioTransport from 'humio-winston';
import Transport from 'winston-transport';

import subscribe from './handlers/subscribe';
import createStore from './store';
import WarnAndEmit from './warnAndEmit';

const createLogger = (): Logger => {
  const transports: Transport[] = [
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ];
  if (process.env.NODE_ENV !== 'development') {
    transports.push(new HumioTransport({
      ingestToken: process.env.HUMIO_INGEST_TOKEN,
      tags: {
        app: 'doodle-live-server',
      },
      handleExceptions: true,
    }));
  }
  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.splat(),
      winston.format.json(),
    ),
    transports: transports,
  });

  return logger;
};

const startServer = (logger: winston.Logger): void => {
  const app = express();
  const server = createServer(app);
  const io = socketIo(server);
  const port = process.env.PORT || 3001;

  const store = createStore();

  app.use(cors());

  io.on('connect', (socket) => {
    logger.info('connected client', { port });
    subscribe({
      io,
      socket,
      store,
      logger,
      warnAndEmit: WarnAndEmit({ logger, socket }),
    });
  });

  server.listen(port, () => {
    logger.info('running server', { port });
  });
};

const logger = createLogger();
startServer(logger);
