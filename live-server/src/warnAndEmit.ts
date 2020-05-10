/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from 'winston';
import { Socket } from 'socket.io'

type InitParams = {
  logger: winston.Logger;
  socket: Socket;
};

export type Params = {
  event: string;
  message: string;
  data?: any;
};

const warnAndEmit = ({
  logger,
  socket,
}: InitParams) => ({
  event,
  message,
  data = {},
}: Params): boolean => {
  logger.warn(message, {
    event,
    ...data,
  });
  return socket.emit(event, { message });
};

export default warnAndEmit;
