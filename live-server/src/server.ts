import * as express from 'express';
import { createServer } from 'http';
import * as socketIo from 'socket.io';
import * as cors from 'cors';

import {
  joinGame,
  disconnect,
} from './handlers';
import {
  postGame
} from './controllers';
import createStore from './store';

const app = express();
const server = createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 3001;

const store = createStore();

app.use(cors())

app.post('/games', postGame());

io.on('connect', (socket) => {
  console.log(`connected client on port ${port}`);

  const handlerParams = { io, socket, store };
  socket.on('joinGame', joinGame(handlerParams));
  socket.on('disconnect', disconnect(handlerParams));
});

server.listen(port, () => {
  console.log(`Running server on port ${port}`);
});
