import { HandlerParams } from "./types"
import { EntryChoicePhase } from '../game';
import { setToNewRound } from './utils';

const acknowledgeWinner = ({
  io,
  socket,
  store: { gameBySocketId },
  logger,
  warnAndEmit,
}: HandlerParams) => () => {
  const game = gameBySocketId[socket.id];
  if (!game) {
    return warnAndEmit({
      event: 'gameDoesNotExist',
      message: 'The game does not exist',
      data: {
        socketId: socket.id,
      }
    });
  }

  const player = game.playersBySocket[socket.id];
  if (!player) {
    return warnAndEmit({
      event: 'gameDoesNotExist',
      message: 'The player is not in the game',
      data: {
        gameCode: game.code,
      },
    });
  }

  const phase = game.round.phase as EntryChoicePhase;
  const playerId = player.id;

  if (game.round.phase.name !== 'entryChoice') {
    return warnAndEmit({
      event: 'failedToAcknowledgeWinner',
      message: 'Cannot acknowledge a winner now',
      data: {
        gameCode: game.code,
        playerId,
        phase: phase.name,
      },
    });
  }

  const playerIdx = game.round.order.indexOf(playerId);
  const isPlayerTurn = phase.index === playerIdx;
  if (isPlayerTurn) {
    return warnAndEmit({
      event: 'failedToAcknowledgeWinner',
      message: 'No need to acknowledge when it is your turn',
      data: {
        gameCode: game.code,
        playerId,
      },
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
      setToNewRound(game);
    } else {
      phase.index += 1;
      phase.acknowledgedBy = {};
    }
  }

  logger.info('acknowledgeWinner', {
    gameCode: game.code,
    playerId,
  });

  return io.to(game.code).emit('gameUpdated', {
    gameState: game,
    updateBy: playerId,
  });
};

export default acknowledgeWinner;
