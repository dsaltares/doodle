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
  logger,
  warnAndEmit,
}: HandlerParams) => ({
  name, code,
}: JoinParams) => {
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
    return warnAndEmit({
      event: 'failedToJoinGame',
      message: 'The game is already full',
      data: {
        gameCode: game.code,
        name,
      },
    });
  }

  if (game.round.phase.name !== 'initial') {
    return warnAndEmit({
      event: 'failedToJoinGame',
      message: 'The game has already started',
      data: {
        gameCode: game.code,
        name,
      },
    });
  }

  game.players[player.id] = player;
  game.playersBySocket[socket.id] = player;
  game.lastUpdate = new Date().getTime();
  games[code] = game;

  gameBySocketId[socket.id] = game;

  logger.info('joinGame', {
    gameCode: code,
    name,
  });

  socket.join(code);
  socket.emit('connectedToGame', ({ player: player.id, code }));
  return io.to(code).emit('gameUpdated', {
    gameState: game,
    updateBy: player.id,
  });
};

export default joinGame;
