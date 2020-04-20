import { connect } from 'react-redux';

import GuessPhase from './GuessPhase';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/reducers';
import { submitConcept } from '../../store/game';
import {
  GameState,
  CreateEntryPhase,
  DrawingEntry,
} from '../../store/game/types';

const getEntry = (playerId: string, game: GameState) => {
  const phase = game.round.phase as CreateEntryPhase;
  const playerIdx = game.round.order.indexOf(playerId);
  const numPlayers = Object.keys(game.players).length;
  const sourceIdx = (playerIdx + phase.index) % numPlayers;
  const sourcePlayerId = game.round.order[sourceIdx];
  const stack = game.round.stacks[sourcePlayerId];
  const previousEntry = stack.entries[phase.index - 1];
  const entry = previousEntry.data as DrawingEntry;
  return {
    author: previousEntry.author,
    entry,
  };
};

const hasSubmitted = (playerId: string, game: GameState) => {
  const phase = game.round.phase as CreateEntryPhase;
  const playerIdx = game.round.order.indexOf(playerId);
  const numPlayers = Object.keys(game.players).length;
  const sourceIdx = (playerIdx + phase.index) % numPlayers;
  const sourcePlayerId = game.round.order[sourceIdx];
  const stack = game.round.stacks[sourcePlayerId];
  const lastEntry = stack.entries[phase.index];
  return lastEntry && lastEntry.author === playerId;
};

const mapStateToProps = (state: RootState) => {
  const playerId = state.game.player as string;
  const game = state.game.gameState as GameState;
  const {
    author,
    entry,
  } = getEntry(playerId, game);
  const playerName = game.players[author].name;
  const message = `Guess what ${playerName} drew`;
  const submitted = state.game.submittedEntry || hasSubmitted(playerId, game);
  return {
    submitted,
    message,
    image: entry.drawing,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSubmit: (concept: string) => dispatch(submitConcept(concept)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GuessPhase);
