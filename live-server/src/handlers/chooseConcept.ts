import { HandlerParams } from "./types"
import { ConceptChoicePhase } from '../game';

type ChooseParams = {
  concept: string,
};

const chooseConcept = ({
  io,
  socket,
  store: { gameBySocketId },
}: HandlerParams) => ({
  concept,
}: ChooseParams) => {
  console.log('chooseConcept', concept);

  const game = gameBySocketId[socket.id];
  const player = game.playersBySocket[socket.id];

  if (game.round.phase.name !== 'conceptChoice') {
    return socket.emit('failedToChooseConcept', {
      message: 'Cannot choose concept now',
    });
  }

  const { choices } = game.round.phase as ConceptChoicePhase;
  const choicesForPlayer = choices[player.id];
  if (!choicesForPlayer.includes(concept)) {
    return socket.emit('failedToChooseConcept', {
      message: 'The concept is not amongst the available concepts',
    });
  }

  const { round: { concepts } } = game;
  const playerHasConcept = !!concepts[player.id];
  if (playerHasConcept) {
    return socket.emit('failedToChooseConcept', {
      message: 'The player had already chosen a concept',
    });
  }

  concepts[player.id] = concept;

  const numPlayers = Object.keys(game.players).length;
  const numConcepts = Object.keys(concepts).length;
  const allPlayerHaveConcepts = numPlayers === numConcepts;
  if (allPlayerHaveConcepts) {
    game.round.phase = {
      name: 'createEntry',
      index: 0,
    };
  }

  return io.to(game.code).emit('gameUpdated', {
    gameState: game,
    updateBy: player.id,
  });
};

export default chooseConcept;
