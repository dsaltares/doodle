import { Games } from './game';

export type Store = {
  games: Games;
  gameBySocketId: Games;
};

const createStore = (): Store => ({
  games: {},
  gameBySocketId: {},
});

export default createStore;
