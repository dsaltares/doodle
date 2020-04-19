import { HandlerParams } from "./types"
import { MIN_PLAYERS } from './constants';
import Concepts from '../concepts';
import { createRound } from './utils';

const startGame = ({
  io,
  socket,
  store: { gameBySocketId },
}: HandlerParams) => () => {
  console.log('startGame');

  const game = gameBySocketId[socket.id];
  const player = game.playersBySocket[socket.id];

  if (game.round.phase.name !== 'initial') {
    return socket.emit('failedToStartGame', {
      message: 'The game has already started',
    });
  }

  if (game.createdBy !== player.id) {
    return socket.emit('failedToStartGame', {
      message: 'Only the creator of the game can start it',
    });
  }

  const numPlayers = Object.keys(game.players).length;
  if (numPlayers < MIN_PLAYERS) {
    return socket.emit('failedToStartGame', {
      message: `The game requires at least ${MIN_PLAYERS} players`,
    });
  }

  game.round = createRound(game);

  return io.to(game.code).emit('gameUpdated', {
    gameState: game,
    updateBy: player.id,
  });
};

export default startGame;
