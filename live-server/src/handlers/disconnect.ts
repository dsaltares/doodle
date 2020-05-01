import { HandlerParams } from "./types"

const disconnect = ({
  io,
  socket,
  store: { games, gameBySocketId },
  logger,
}: HandlerParams) => ({}) => {
  const game = gameBySocketId[socket.id];
  if (!game) {
    return;
  }
  const player = game.playersBySocket[socket.id];

  delete game.playersBySocket[socket.id];
  delete game.players[player.id];
  delete gameBySocketId[socket.id];

  logger.info('disconnect', {
    playerId: player.id,
    gameCode: game.code,
    playersLeft: Object.keys(game.players),
  });

  io.to(game.code).emit('gameUpdated', { gameState: game });

  const numPlayers = Object.keys(game.players).length;
  if (numPlayers === 0) {
    delete games[game.code];
  }
};

export default disconnect;
