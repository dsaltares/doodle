import { HandlerParams } from "./types"
import { EntryChoicePhase } from '../game';

type ChooseParams = {
  targetPlayer: string,
};

const chooseEntry = ({
  io,
  socket,
  store: { gameBySocketId },
}: HandlerParams) => ({
  targetPlayer,
}: ChooseParams) => {
  console.log('chooseEntry');

  const game = gameBySocketId[socket.id];

  if (game.round.phase.name !== 'entryChoice') {
    return socket.emit('failedToChooseEntry', {
      message: 'Cannot choose an entry now',
    });
  }

  const phase = game.round.phase as EntryChoicePhase;
  const player = game.playersBySocket[socket.id];
  const playerId = player.id;
  const playerIdx = game.round.order.indexOf(playerId);
  const isPlayerTurn = phase.index === playerIdx;
  if (!isPlayerTurn) {
    return socket.emit('failedToChooseEntry', {
      message: 'Not the player turn',
    });
  }

  const stack = game.round.stacks[playerId];
  const alreadyChosen = !!stack.chosen;

  if (!alreadyChosen) {
    stack.chosen = targetPlayer;
    game.players[targetPlayer].points += 1;
  }

  return io.to(game.code).emit('gameUpdated', {
    gameState: game,
    updateBy: playerId,
  });
};

export default chooseEntry;
