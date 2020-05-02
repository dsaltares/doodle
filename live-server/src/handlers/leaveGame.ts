import { HandlerParams } from "./types"
import { initialRound } from './utils';

const leaveGame = ({
  io,
  socket,
  store: { games, gameBySocketId },
  logger,
  warnAndEmit,
}: HandlerParams) => () => {
  const game = gameBySocketId[socket.id];
  if (!game) {
    logger.info('The game does not exist', {
      event: 'leaveGame',
    });
    return;
  }

  const player = game.playersBySocket[socket.id];
  if (!player) {
    logger.info('The player is not in the game', {
      event: 'leaveGame',
      gameCode: game.code,
    });
    return;
  }

  const playerId = player.id;

  delete game.playersBySocket[socket.id];
  delete gameBySocketId[socket.id];
  delete game.players[playerId];

  const phaseName = game.round.phase.name;
  if (phaseName !== 'initial') {
    game.round = initialRound();
  }

  const playerIds = Object.keys(game.players);
  logger.info('leaveGame', {
    gameCode: game.code,
    playerId,
    phase: phaseName,
    playerIds: Object.keys(game.players),
  });

  socket.leave(game.code);
  io.to(game.code).emit('gameUpdated', {
    gameState: game,
    updateBy: player.id,
    alert: {
      severity: 'warning',
      message: `${player.name} left the game!`,
    },
  });

  const numPlayers = playerIds.length;
  if (numPlayers === 0) {
    delete games[game.code];
  }
};

export default leaveGame;
