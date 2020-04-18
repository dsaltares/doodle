
import * as express from 'express';
import { createServer } from 'http';
import * as socketIo from 'socket.io';
import * as cors from 'cors';
import { v4 as uuid4 } from 'uuid';
import { Games, Game } from './types';
import { createGame, createPlayer } from './game';

const app = express();
const server = createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 3001;

const games: Games = {};
const gameBySocketId: Games = {};

app.use(cors())

app.post('/games', (_request, response) => {
  console.log('CREATE game');
  const code = uuid4();
  response.status(200).send({ code });
});

io.on('connect', (socket) => {
  console.log(`connected client on port ${port}`);

  socket.on('joinGame', ({ name, code }) => {
    console.log('joinGame: ', name, code);
    const game = games[code] || createGame({ code });
    const player = createPlayer({ name, socketId: socket.id });
    game.players[player.id] = player;
    game.playersBySocket[socket.id] = player;
    game.lastUpdate = new Date().getTime();
    games[code] = game;

    gameBySocketId[socket.id] = game;

    socket.join(code);
    socket.emit('connectedToGame', ({ player, code }));
    io.to(code).emit('gameUpdated', {
      gameState: game,
      actionByPlayer: player,
    });
  });

  socket.on('disconnect', () => {
    const game = gameBySocketId[socket.id];
    if (!game) {
      return;
    }
    const player = game.playersBySocket[socket.id];
    delete game.playersBySocket[socket.id];
    delete game.players[player.id];
    io.to(game.code).emit('gameUpdated', { gameState: game });
    console.log('left game: ', player.name);
  });
});

server.listen(port, () => {
  console.log(`Running server on port ${port}`);
});
