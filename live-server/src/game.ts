import { Players } from './player';

export type ConceptEntry = {
  type: 'contept';
  concept: string;
};

export type DrawingEntry = {
  type: 'drawing';
  drawing: string;
};

type Entry = {
  author: string;
  data: ConceptEntry | DrawingEntry;
};

type Stack = {
  player: string;
  entries: Entry[];
  chosen?: string;
};

type Stacks = {
  [id: string]: Stack;
};

export type InitialPhase = {
  name: 'initial';
};
export type ConceptChoicePhase = {
  name: 'conceptChoice';
  choices: {
    [id: string]: string[];
  };
};
export type CreateEntryPhase = {
  name: 'createEntry';
  index: number;
};
export type EntryChoicePhase = {
  name: 'entryChoice';
  index: number;
  acknowledgedBy: {
    [id: string]: boolean;
  };
};

type Phase =
  | InitialPhase
  | ConceptChoicePhase
  | CreateEntryPhase
  | EntryChoicePhase;

type Concepts = {
  [id: string]: string;
};

export type Round = {
  phase: Phase;
  order: string[];
  stacks: Stacks;
  concepts: Concepts;
};

export type Game = {
  code: string;
  players: Players;
  waitingPlayers: Players;
  playersBySocket: Players;
  lastUpdate: number;
  createdBy: string;
  round: Round;
  usedConcepts: string[];
};

export type Games = {
  [code: string]: Game;
};

export type CreateGameParams = {
  code: string;
  creator: string;
};

export const createGame = ({ code, creator }: CreateGameParams): Game => ({
  code,
  players: {},
  waitingPlayers: {},
  playersBySocket: {},
  lastUpdate: new Date().getTime(),
  createdBy: creator,
  round: {
    phase: {
      name: 'initial',
    },
    order: [],
    stacks: {},
    concepts: {},
  },
  usedConcepts: [],
});
