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
  const hasAcknowledged = phase.acknowledgeBy.includes(playerId);
  if (!hasAcknowledged) {
    phase.acknowledgeBy.push(playerId);
  }

  const numPlayers = Object.keys(game.players).length;
  const allHaveAcknowledged = phase.acknowledgeBy.length === numPlayers;
  const isFinalStack = phase.index === numPlayers - 1;
  if (allHaveAcknowledged) {
    if (isFinalStack) {
      game.round = createRound(game);
    } else {
      phase.index += 1;
    }
  }

  return io.to(game.code).emit('gameUpdated', {
    gameState: game,
    updateBy: playerId,
  });
};

export default acknowledgeWinner;
