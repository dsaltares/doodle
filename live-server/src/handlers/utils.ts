import shuffle from 'lodash.shuffle';
import chunk from 'lodash.chunk';

import {
  Game,
  Round,
} from '../game';
import { CONCEPTS_PER_PLAYER } from './constants';
import Concepts from '../concepts';

export const createRound = (game: Game): Round => {
  const randomConcepts = shuffle(Concepts);
  const conceptChunks = chunk(randomConcepts, CONCEPTS_PER_PLAYER);
  const playerIds = Object.keys(game.players);

  return {
    phase: {
      name: 'conceptChoice',
      choices: playerIds.reduce((acc, id, index) => ({
        ...acc,
        [id]: conceptChunks[index],
      }), {}),
    },
    order: shuffle(playerIds),
    stacks: {},
    concepts: {},
  };
};
