export type GamePhase = 'initial'
  | 'joining'
  | 'waitingToStart'
  | 'choosingConcept'
  | 'drawing'
  | 'guessing'
  | 'waitingForPlayers'
  | 'choosingEntry'
  | 'chosenEntry';

type Avatar = {
  topType: string,
  accessoriesType: string,
  hairColor: string,
  facialHairType: string,
  clotheType: string,
  clotheColor: string,
  eyeType: string,
  eyebrowType: string,
  mouthType: string,
  skinColor: string,
}

export type Player = {
  id: string,
  name: string,
  avatar: Avatar,
  points: number,
}

export type PlayerDictionary = {
  [id: string]: Player,
}

export type GameState = {
  code: string,
  players: PlayerDictionary,
  lastUpdate: number,
}

export type GameConfig = {
  name?: string,
  code?: string,
}

export type GameSliceState = {
  config: GameConfig,
  gameState?: GameState,
  player?: Player,
}

export type CreateGameParams = {
  name: string,
};

export type JoinGameParams = {
  code: string,
  name: string,
};

export type GameJoinedEvent = {
  code: string,
  player: Player,
};

export type GameUpdatedEvent = {
  gameState: GameState,
};
