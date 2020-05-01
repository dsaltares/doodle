import winston from 'winston';
import { Socket } from 'socket.io'

type InitParams = {
  logger: winston.Logger,
  socket: Socket,
};

type Params = {
  event: string,
  message: string,
  data: any,
};

const warnAndRespond = ({
  logger,
  socket,
}: InitParams) => ({
  event,
  message,
  data,
}: Params): boolean => {
  logger.warn(message, {
    event,
    ...data,
  });
  return socket.emit(event, { message });
};

export default warnAndRespond;
