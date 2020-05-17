import { RootState } from '../reducers';
import {
  Player,
  CreateEntryPhase,
  Stack,
  Entry,
  ConceptEntry,
  DrawingEntry,
} from './types';

export const playerIds = (state: RootState): string[] => {
  if (!state.game.gameState) {
    return [];
  }
  return Object.keys(state.game.gameState.players);
};

export const waitingPlayerIds = (state: RootState): string[] => {
  if (!state.game.gameState) {
    return [];
  }
  return Object.keys(state.game.gameState.waitingPlayers);
};

export const player = (state: RootState, id: string): Player | null => {
  const game = state.game.gameState;
  if (!game) {
    return null;
  }
  return game.players[id] || game.waitingPlayers[id];
};

export const isWaiting = (state: RootState, id: string): boolean => {
  const game = state.game.gameState;
  if (!game) {
    return false;
  }
  return !!game.waitingPlayers[id];
};

export const isFirstCreateTurn = (state: RootState): boolean => {
  const game = state.game.gameState;
  if (!game) {
    return false;
  }
  const phase = game.round.phase;
  if (phase.name !== 'createEntry') {
    return false;
  }
  return phase.index === 0;
};

const currentStackForPlayer = (
  state: RootState,
  playerId: string
): Stack | undefined => {
  const game = state.game.gameState;
  if (!game || game.round.phase.name !== 'createEntry') {
    return;
  }

  const phase = game.round.phase as CreateEntryPhase;
  const playerIdx = game.round.order.indexOf(playerId);
  const numPlayers = Object.keys(game.players).length;
  const playerIdxMinusTurn = playerIdx - phase.index;
  const sourceIdx =
    playerIdxMinusTurn < 0
      ? numPlayers + playerIdxMinusTurn
      : playerIdxMinusTurn;
  const sourcePlayerId = game.round.order[sourceIdx];
  return game.round.stacks[sourcePlayerId];
};

const getPlayerSourceEntry = (
  state: RootState,
  playerId: string
): Entry | undefined => {
  const game = state.game.gameState;
  if (!game || game.round.phase.name !== 'createEntry') {
    return;
  }

  const phase = game.round.phase as CreateEntryPhase;
  const stack = currentStackForPlayer(state, playerId) as Stack;
  const lastEntry = stack.entries[phase.index - 1];
  return lastEntry;
};

export const getSourceEntry = (state: RootState): Entry | undefined => {
  const playerId = state.game.player as string;
  return getPlayerSourceEntry(state, playerId);
};

export const currentConcept = (state: RootState): string | undefined => {
  if (isFirstCreateTurn(state)) {
    const game = state.game.gameState;
    const playerId = state.game.player;
    if (!game || !playerId) {
      return;
    }

    return game.round.concepts[playerId];
  }

  const entry = getSourceEntry(state) as Entry;
  const conceptEntry = entry.data as ConceptEntry;
  return conceptEntry.concept;
};

export const currentDrawing = (state: RootState): string | undefined => {
  const entry = getSourceEntry(state) as Entry;
  const drawingEntry = entry.data as DrawingEntry;
  return drawingEntry.drawing;
};

export const sourceEntryAuthor = (state: RootState): string | undefined => {
  if (isFirstCreateTurn(state)) {
    const game = state.game.gameState;
    const playerId = state.game.player;
    if (!game || !playerId) {
      return;
    }

    return game.players[playerId].name;
  }

  const entry = getSourceEntry(state) as Entry;
  const author = player(state, entry.author);
  return author?.name;
};

export const playerHasSubmitted = (
  state: RootState,
  playerId: string
): boolean => {
  const game = state.game.gameState;
  if (!game || game.round.phase.name !== 'createEntry') {
    return false;
  }

  const stack = currentStackForPlayer(state, playerId) as Stack;
  const entry = stack.entries[stack.entries.length - 1];
  return !!entry && entry.author === playerId;
};

export const hasSubmitted = (state: RootState): boolean => {
  if (state.game.submittedEntry) {
    return true;
  }

  const game = state.game.gameState;
  if (!game || game.round.phase.name !== 'createEntry') {
    return false;
  }

  const playerId = state.game.player as string;
  return playerHasSubmitted(state, playerId);
};
