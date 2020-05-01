import { HandlerParams } from "./types"
import { MIN_PLAYERS } from './constants';
import { createRound } from './utils';

const startGame = ({
  io,
  socket,
  store: { gameBySocketId },
  logger,
  warnAndEmit,
}: HandlerParams) => () => {
  const game = gameBySocketId[socket.id];
  const player = game.playersBySocket[socket.id];
  const playerId = player.id;

  if (game.round.phase.name !== 'initial') {
    return warnAndEmit({
      event: 'failedToStartGame',
      message: 'The game has already started',
      data: {
        gameCode: game.code,
        playerId,
        phase: game.round.phase.name,
      },
    });
  }

  if (game.createdBy !== playerId) {
    return warnAndEmit({
      event: 'failedToStartGame',
      message: 'Only the creator of the game can start it',
      data: {
        gameCode: game.code,
        playerId,
        createdBy: game.createdBy,
      },
    });
  }

  const playerIds = Object.keys(game.players);
  const numPlayers = playerIds.length;
  if (numPlayers < MIN_PLAYERS) {
    return warnAndEmit({
      event: 'failedToStartGame',
      message: `The game requires at least ${MIN_PLAYERS} players`,
      data: {
        gameCode: game.code,
        playerId,
        playerIds,
      },
    });
  }

  game.round = createRound(game);

  logger.info('startGame', {
    gameCode: game.code,
    playerId,
    playerIds,
  });

  return io.to(game.code).emit('gameUpdated', {
    gameState: game,
    updateBy: player.id,
  });
};

export default startGame;
