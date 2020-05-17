import { HandlerParams } from './types';
import { ConceptEntry, DrawingEntry, CreateEntryPhase } from '../game';

type EntryParams = {
  entry: ConceptEntry | DrawingEntry;
};

const submitEntry = ({
  io,
  socket,
  store: { gameBySocketId },
  logger,
  warnAndEmit,
}: HandlerParams) => ({ entry }: EntryParams): boolean => {
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

  if (game.round.phase.name !== 'createEntry') {
    return warnAndEmit({
      event: 'createEntry',
      message: 'Cannot submit an entry now',
      data: {
        gameCode: game.code,
        playerId,
        phase: game.round.phase.name,
      },
    });
  }

  const phase = game.round.phase as CreateEntryPhase;
  const numPlayers = Object.keys(game.players).length;
  const playerIdx = game.round.order.indexOf(playerId);
  const playerIdxMinusTurn = playerIdx - phase.index;
  const targetIdx =
    playerIdxMinusTurn < 0
      ? numPlayers + playerIdxMinusTurn
      : playerIdxMinusTurn;
  const targetPlayerId = game.round.order[targetIdx];
  const stack = game.round.stacks[targetPlayerId];
  const stackHasEntryByPlayer = !!stack.entries.find(
    (entry) => entry.author === playerId
  );
  if (stackHasEntryByPlayer) {
    return warnAndEmit({
      event: 'createEntry',
      message: 'Already submitted to this stack',
      data: {
        gameCode: game.code,
        playerId,
        targetPlayerId,
        order: game.round.order,
      },
    });
  }

  stack.entries.push({
    author: playerId,
    data: entry,
  });

  const isTurnComplete = Object.keys(game.round.stacks)
    .map((id) => game.round.stacks[id].entries)
    .every((entries) => entries.length === phase.index + 1);
  if (isTurnComplete) {
    phase.index += 1;
  }

  const isCreateEntryDone = phase.index === numPlayers;
  if (isCreateEntryDone) {
    game.round.phase = {
      name: 'entryChoice',
      index: 0,
      acknowledgedBy: {},
    };
  }

  logger.info('submitEntry', {
    gameCode: game.code,
    playerId,
    targetPlayerId,
    entryType: entry.type,
    phaseIndex: phase.index,
  });

  return io.to(game.code).emit('gameUpdated', {
    gameState: game,
    updateBy: playerId,
  });
};

export default submitEntry;
