import { HandlerParams } from "./types"
import { EntryChoicePhase } from '../game';

type ChooseParams = {
  targetPlayer: string;
};

const chooseEntry = ({
  io,
  socket,
  store: { gameBySocketId },
  logger,
  warnAndEmit,
}: HandlerParams) => ({
  targetPlayer,
}: ChooseParams): boolean => {
  const game = gameBySocketId[socket.id];
  if (!game) {
    return warnAndEmit({
      event: 'gameDoesNotExist',
      message: 'The game does not exist',
      data: {
        socketId: socket.id,
      },
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

  const playerId = player.id;

  if (game.round.phase.name !== 'entryChoice') {
    return warnAndEmit({
      event: 'failedToChooseEntry',
      message: 'Cannot choose an entry now',
      data: {
        gameCode: game.code,
        playerId,
        phase: game.round.phase.name,
      },
    });
  }

  if (playerId === targetPlayer) {
    return warnAndEmit({
      event: 'failedToChooseEntry',
      message: 'Cannot choose your own entry',
      data: {
        gameCode: game.code,
        playerId,
        targetPlayer,
      },
    });
  }

  const phase = game.round.phase as EntryChoicePhase;
  const playerIdx = game.round.order.indexOf(playerId);
  const isPlayerTurn = phase.index === playerIdx;
  if (!isPlayerTurn) {
    return warnAndEmit({
      event: 'failedToChooseEntry',
      message: 'Not the player turn',
      data: {
        gameCode: game.code,
        playerId,
        index: phase.index,
        order: game.round.order,
      },
    });
  }

  const stack = game.round.stacks[playerId];
  const alreadyChosen = !!stack.chosen;

  if (!alreadyChosen) {
    stack.chosen = targetPlayer;
    game.players[targetPlayer].points += 1;
  }

  logger.info('chooseEntry', {
    gameCode: game.code,
    playerId,
    targetPlayer,
  });

  return io.to(game.code).emit('gameUpdated', {
    gameState: game,
    updateBy: playerId,
  });
};

export default chooseEntry;
