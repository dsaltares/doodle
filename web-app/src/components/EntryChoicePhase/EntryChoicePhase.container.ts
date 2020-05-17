import { connect } from 'react-redux';

import EntryChoicePhase, {
  StateProps,
  DispatchProps,
} from './EntryChoicePhase';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/reducers';
import {
  GameState,
  EntryChoicePhase as EntryChoicePhaseType,
} from '../../store/game/types';
import { chooseEntry, acknowledgeWinner } from '../../store/game';

const mapStateToProps = (state: RootState): StateProps => {
  const game = state.game.gameState as GameState;
  const phase = game.round.phase as EntryChoicePhaseType;
  const stackPlayerId = game.round.order[phase.index];
  const stackPlayerName = game.players[stackPlayerId].name;
  const concept = game.round.concepts[stackPlayerId];
  const stack = game.round.stacks[stackPlayerId];
  const playerId = state.game.player as string;
  const currentPlayerChooses = playerId === stackPlayerId;
  const chosenPlayerId = stack.chosen || state.game.chosenEntry;
  const chosenPlayerName = chosenPlayerId
    ? game.players[chosenPlayerId].name
    : undefined;
  const entries = stack.entries;
  const acknowledged =
    state.game.acknowledgedWinner || !!phase.acknowledgedBy[playerId];

  return {
    stackPlayerName,
    concept,
    currentPlayerChooses,
    chosenPlayerId,
    chosenPlayerName,
    entries,
    acknowledged,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  onChooseEntry: (targetPlayer: string): void => {
    dispatch(chooseEntry(targetPlayer));
  },
  onAcknowledge: (): void => {
    dispatch(acknowledgeWinner());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryChoicePhase);
