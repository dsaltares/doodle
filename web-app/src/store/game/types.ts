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
  name: string,
  avatar: Avatar,
  points: number,
}

export type Players = {
  [id: string]: Player,
}

export type ConceptEntry = {
  type: 'contept',
  concept: string,
}

export type DrawingEntry = {
  type: 'drawing',
  drawing: string
}

export type Entry = {
  author: string,
  data: ConceptEntry | DrawingEntry
};

export type Stack = {
  player: string,
  entries: Entry[],
  chosen?: string,
};

type Stacks = {
  [id: string]: Stack,
};

export type InitialPhase = {
  name: 'initial',
};
export type ConceptChoicePhase = {
  name: 'conceptChoice'
  choices: {
    [id: string]: string[],
  },
};
export type CreateEntryPhase = {
  name: 'createEntry'
  index: number,
};
export type EntryChoicePhase = {
  name: 'entryChoice',
  index: number,
  acknowledgedBy: {
    [id: string]: boolean,
  },
}

type Phase = InitialPhase
  | ConceptChoicePhase
  | CreateEntryPhase
  | EntryChoicePhase;

type Concepts = {
  [id: string]: string,
};

export type Round = {
  phase: Phase,
  order: string[],
  stacks: Stacks,
  concepts: Concepts,
};

export type GameState = {
  code: string,
  players: Players,
  playersBySocket: Players,
  lastUpdate: number,
  createdBy: string,
  round: Round,
};

export type GameConfig = {
  name?: string,
  code?: string,
}

export type Alert = {
  message: string,
  severity: 'error' | 'warning' | 'info' | 'success',
  ignorePlayers: string[],
}

export type GameSliceState = {
  config: GameConfig,
  gameState?: GameState,
  player?: string,
  startingGame: boolean,
  choosingConcept?: string,
  submittedEntry: boolean,
  chosenEntry?: string,
  acknowledgedWinner: boolean;
  alerts: Alert[],
}

export type CreateGameParams = {
  name: string,
  goToGame: (code: string) => void,
};

export type JoinGameParams = {
  code: string,
  name: string,
  goToGame: (code: string) => void,
};

export type GameJoinedEvent = {
  code: string,
  player: string,
};

export type GameUpdatedEvent = {
  gameState: GameState,
  updateBy: string,
  alert?: Alert,
};
