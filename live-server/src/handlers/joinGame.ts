import { HandlerParams } from "./types"
import { createPlayer,  } from '../player';
import { createGame } from '../game';

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
    updateBy: player.id,
  });
};

export default joinGame;
