export type Avatar = {
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
  socketId: string,
  name: string,
  avatar: Avatar,
  points: number,
};

export type PlayerDictionary = {
  [id: string]: Player,
}

export type Game = {
  code: string,
  players: PlayerDictionary,
  playersBySocket: PlayerDictionary,
  lastUpdate: number,
};

export type Games = {
  [code: string]: Game,
};
