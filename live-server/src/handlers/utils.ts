import shuffle from 'lodash.shuffle';
import chunk from 'lodash.chunk';
import flatten from 'lodash.flatten';

import { Game } from '../game';
import { CONCEPTS_PER_PLAYER } from './constants';
import Concepts from '../concepts';

export const setToNewRound = (game: Game): void => {
  const playerIds = Object.keys(game.players);
  const numPlayers = playerIds.length;
  const numConceptsNeeded = numPlayers * CONCEPTS_PER_PLAYER;
  const usedConcepts = new Set(game.usedConcepts);
  const unusedConcepts = Concepts.filter(concept => !usedConcepts.has(concept));
  const concepts = unusedConcepts.length >= numConceptsNeeded
    ? unusedConcepts
    : ((): string[] => {
      game.usedConcepts = [];
      return Concepts;
    })();

  const randomConcepts = shuffle(concepts);
  const conceptChunks = chunk(randomConcepts, CONCEPTS_PER_PLAYER);

  game.players = {
    ...game.players,
    ...game.waitingPlayers,
  };
  game.waitingPlayers = {};
  game.round = {
    phase: {
      name: 'conceptChoice',
      choices: playerIds.reduce((acc, id, index) => ({
        ...acc,
        [id]: conceptChunks[index],
      }), {}),
    },
    order: shuffle(playerIds),
    stacks: playerIds.reduce((acc, id) => ({
      ...acc,
      [id]: {
        player: id,
        entries: [],
      }
    }), {}),
    concepts: {},
  };
  game.usedConcepts = [
    ...game.usedConcepts,
    ...flatten(conceptChunks.slice(0, numPlayers)),
  ];
};

export const setToInitialRound = (game: Game): void => {
  game.round = {
    phase: {
      name: 'initial',
    },
    order: [],
    stacks: {},
    concepts: {},
  };
};
