import { HandlerParams } from "./types"
import { EntryChoicePhase } from '../game';
import { createRound } from './utils';

const acknowledgeWinner = ({
  io,
  socket,
  store: { gameBySocketId },
}: HandlerParams) => () => {
  console.log('acknowledgeWinner');

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
  if (isPlayerTurn) {
    return socket.emit('failedToChooseEntry', {
      message: 'No need to acknowledge when it is your turn',
    });
  }

  const hasAcknowledged = !!phase.acknowledgedBy[playerId];
  if (!hasAcknowledged) {
    phase.acknowledgedBy[playerId] = true;
  }

  const numPlayers = Object.keys(game.players).length;
  const allHaveAcknowledged = Object.keys(phase.acknowledgedBy).length === numPlayers - 1;
  const isFinalStack = phase.index === numPlayers - 1;
  if (allHaveAcknowledged) {
    if (isFinalStack) {
      game.round = createRound(game);
    } else {
      phase.index += 1;
      phase.acknowledgedBy = {};
    }
  }

  return io.to(game.code).emit('gameUpdated', {
    gameState: game,
    updateBy: playerId,
  });
};

export default acknowledgeWinner;
