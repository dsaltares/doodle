import { HandlerParams } from "./types"

const disconnect = ({
  io,
  socket,
  store: { games, gameBySocketId },
}: HandlerParams) => ({}) => {
  const game = gameBySocketId[socket.id];
  if (!game) {
    return;
  }
  const player = game.playersBySocket[socket.id];

  delete game.playersBySocket[socket.id];
  delete game.players[player.id];
  delete gameBySocketId[socket.id];

  io.to(game.code).emit('gameUpdated', { gameState: game });
  console.log('left game: ', player.name);

  const numPlayers = Object.keys(game.players).length;
  if (numPlayers === 0) {
    delete games[game.code];
  }
};

export default disconnect;
