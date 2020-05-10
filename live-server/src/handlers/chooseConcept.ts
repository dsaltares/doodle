import { HandlerParams } from "./types"
import { ConceptChoicePhase } from '../game';

type ChooseParams = {
  concept: string;
};

const chooseConcept = ({
  io,
  socket,
  store: { gameBySocketId },
  logger,
  warnAndEmit,
}: HandlerParams) => ({
  concept,
}: ChooseParams): boolean => {
  const game = gameBySocketId[socket.id];
  if (!game) {
    return warnAndEmit({
      event: 'gameDoesNotExist',
      message: 'The game does not exist',
      data: {
        socketId: socket.id,
      },
    });
  }

  const player = game.playersBySocket[socket.id];
  if (!player) {
    return warnAndEmit({
      event: 'gameDoesNotExist',
      message: 'The player is not in the game',
      data: {
        gameCode: game.code,
      },
    });
  }

  const playerId = player.id;
  const phase = game.round.phase;

  if (phase.name !== 'conceptChoice') {
    return warnAndEmit({
      event: 'failedToChooseConcept',
      message: 'Cannot choose concept now',
      data: {
        gameCode: game.code,
        playerId,
        phase: phase.name,
      },
    });
  }

  const { choices } = game.round.phase as ConceptChoicePhase;
  const choicesForPlayer = choices[playerId];
  if (!choicesForPlayer.includes(concept)) {
    return warnAndEmit({
      event: 'failedToChooseConcept',
      message: 'The concept is not amongst the available concepts',
      data: {
        gameCode: game.code,
        playerId,
        concept,
        choicesForPlayer,
      },
    });
  }

  const { round: { concepts } } = game;
  const playerHasConcept = !!concepts[playerId];
  if (playerHasConcept) {
    return warnAndEmit({
      event: 'failedToChooseConcept',
      message: 'The player had already chosen a concept',
      data: {
        gameCode: game.code,
        playerId,
        concept: concepts[playerId],
      },
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

  logger.info('chooseConcept', {
    gameCode: game.code,
    playerId,
    concept,
  });

  return io.to(game.code).emit('gameUpdated', {
    gameState: game,
    updateBy: player.id,
  });
};

export default chooseConcept;
