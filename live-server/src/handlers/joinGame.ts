import { HandlerParams } from "./types"
import { createPlayer,  } from '../player';
import { createGame } from '../game';
import { MAX_PLAYERS } from './constants';

type JoinParams = {
  name: string,
  code: string,
}

const joinGame = ({
  io,
  socket,
  store: { games, gameBySocketId },
}: HandlerParams) => ({
  name, code,
}: JoinParams) => {
  console.log('joinGame: ', name, code);

  const alreadyInGame = !!gameBySocketId[socket.id];
  if (alreadyInGame) {
    const game = gameBySocketId[socket.id];
    const player = game.playersBySocket[socket.id];
    return socket.emit('connectedToGame', ({
      player: player.id,
      code
    }));
  }

  const player = createPlayer({ name, socketId: socket.id });
  const game = games[code] || createGame({
    code,
    creator: player.id,
  });

  if (Object.keys(game.players).length >= MAX_PLAYERS) {
    return socket.emit('failedToJoinGame', {
      message: 'The game is already full',
    });
  }

  if (game.round.phase.name !== 'initial') {
    return socket.emit('failedToJoinGame', {
      message: 'The game has already started',
    });
  }

  game.players[player.id] = player;
  game.playersBySocket[socket.id] = player;
  game.lastUpdate = new Date().getTime();
  games[code] = game;

  gameBySocketId[socket.id] = game;

  socket.join(code);
  socket.emit('connectedToGame', ({ player: player.id, code }));
  return io.to(code).emit('gameUpdated', {
    gameState: game,
    updateBy: player.id,
  });
};

export default joinGame;
