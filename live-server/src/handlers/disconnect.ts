import { HandlerParams } from "./types"

const disconnect = ({
  io,
  socket,
  store: { gameBySocketId },
}: HandlerParams) => ({}) => {
  const game = gameBySocketId[socket.id];
  if (!game) {
    return;
  }
  const player = game.playersBySocket[socket.id];
  delete game.playersBySocket[socket.id];
  delete game.players[player.id];
  io.to(game.code).emit('gameUpdated', { gameState: game });
  console.log('left game: ', player.name);
};

export default disconnect;
