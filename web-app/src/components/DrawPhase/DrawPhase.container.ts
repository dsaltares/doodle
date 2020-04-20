import { connect } from 'react-redux';

import DrawPhase from './DrawPhase';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/reducers';
import { submitDrawing } from '../../store/game';
import {
  GameState,
  CreateEntryPhase,
  ConceptEntry,
} from '../../store/game/types';

const getMessage = (playerId: string, game: GameState) => {
  const phase = game.round.phase as CreateEntryPhase;
  if (phase.index === 0) {
    const concept = game.round.concepts[playerId];
    return `Draw "${concept}"`;
  }

  const playerIdx = game.round.order.indexOf(playerId);
  const numPlayers = Object.keys(game.players).length;
  const sourceIdx = (playerIdx + phase.index) % numPlayers;
  const sourcePlayerId = game.round.order[sourceIdx];
  const stack = game.round.stacks[sourcePlayerId];
  const lastEntry = stack.entries[phase.index - 1];
  const conceptEntry = lastEntry.data as ConceptEntry;
  const concept = conceptEntry.concept;
  const sourcePlayerName = game.players[sourcePlayerId].name;
  return `From ${sourcePlayerName}, draw "${concept}"`;
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
  const message = getMessage(playerId, game);
  const submitted = state.game.submittedEntry || hasSubmitted(playerId, game);
  return {
    submitted,
    message,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSubmit: (drawing: string) => dispatch(submitDrawing(drawing)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawPhase);
