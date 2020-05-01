import { Server, Socket } from 'socket.io'
import winston from 'winston';

import { Store } from '../store';
import { Params as WarnAndEmitParams } from '../warnAndEmit';

export type HandlerParams = {
  io: Server,
  socket: Socket,
  store: Store,
  logger: winston.Logger,
  warnAndEmit: (params: WarnAndEmitParams) => boolean,
}
