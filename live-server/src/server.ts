import express from 'express';
import { createServer } from 'http';
import socketIo from 'socket.io';
import cors from 'cors';

import subscribe from './handlers/subscribe';
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
  subscribe({ io, socket, store });
});

server.listen(port, () => {
  console.log(`Running server on port ${port}`);
});
