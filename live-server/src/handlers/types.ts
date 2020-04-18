import { Server, Socket } from "socket.io"
import { Store } from '../store';

export type HandlerParams = {
  io: Server,
  socket: Socket,
  store: Store,
}
