import { HandlerParams } from "./types"
import {
  ConceptEntry,
  DrawingEntry,
  CreateEntryPhase,
} from '../game';

type EntryParams = {
  entry: ConceptEntry | DrawingEntry,
};

const submitEntry = ({
  io,
  socket,
  store: { gameBySocketId },
}: HandlerParams) => ({
  entry,
}: EntryParams) => {
  console.log('submitEntry');

  const game = gameBySocketId[socket.id];

  if (game.round.phase.name !== 'createEntry') {
    return socket.emit('failedToSubmitEntry', {
      message: 'Cannot submit an entry now',
    });
  }

  const phase = game.round.phase as CreateEntryPhase;
  const numPlayers = Object.keys(game.players).length;
  const player = game.playersBySocket[socket.id];
  const playerId = player.id;
  const playerIdx = game.round.order.indexOf(playerId);
  const targetPlayerIdx = (playerIdx + phase.index) % numPlayers;
  const targetPlayerId = game.round.order[targetPlayerIdx];
  const stack = game.round.stacks[targetPlayerId];
  const stackHasEntryByPlayer = !!stack.entries.find(entry => entry.author === playerId);
  if (stackHasEntryByPlayer) {
    return socket.emit('failedToSubmitEntry', {
      message: 'Already submitted to this stack',
    });
  }

  stack.entries.push({
    author: playerId,
    data: entry,
  });

  const isTurnComplete = Object
    .keys(game.round.stacks)
    .map(id => game.round.stacks[id].entries)
    .every((entries => entries.length === phase.index + 1));
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

  return io.to(game.code).emit('gameUpdated', {
    gameState: game,
    updateBy: playerId,
  });
};

export default submitEntry;
