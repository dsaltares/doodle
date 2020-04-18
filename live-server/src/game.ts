import { Players } from './player';

export type Game = {
  code: string,
  players: Players,
  playersBySocket: Players,
  lastUpdate: number,
};

export type Games = {
  [code: string]: Game,
};

export type CreateGameParams = {
  code: string,
}

export const createGame = ({ code }: CreateGameParams): Game => ({
  code,
  players: {},
  playersBySocket: {},
  lastUpdate: new Date().getTime(),
});
