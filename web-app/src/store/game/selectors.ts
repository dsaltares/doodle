import { RootState } from "../reducers";
import { Player } from "./types";

export const playerIds = (state: RootState): string[] => {
  if (!state.game.gameState) {
    return [];
  }
  return Object.keys(state.game.gameState.players);
};

export const player = (state: RootState, id: string): Player | null => {
  if (!state.game.gameState) {
    return null;
  }
  return state.game.gameState.players[id];
}
