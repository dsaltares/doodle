import { RootState } from "../reducers";
import { Player } from "./types";

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
