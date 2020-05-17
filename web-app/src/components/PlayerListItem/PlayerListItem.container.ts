import { connect } from 'react-redux';
import PlayerListItem, { PlayerState, Props } from './PlayerListItem';
import { RootState } from '../../store/reducers';
import { selectors } from '../../store/game';
import {
  CreateEntryPhase,
  EntryChoicePhase,
  Player,
} from '../../store/game/types';
import { MIN_PLAYERS } from '../../store/game/constants';

type OwnProps = {
  id: string;
};

const getPlayerState = (
  state: RootState,
  id: string,
  isWaiting: boolean
): PlayerState | undefined => {
  if (!state.game.gameState || isWaiting) {
    return;
  }

  const game = state.game.gameState;
  const createdByCurrentPlayer = game.createdBy === id;
  const numPlayers = Object.keys(game.players).length;

  switch (game.round.phase.name) {
    case 'initial':
      if (createdByCurrentPlayer) {
        return numPlayers >= MIN_PLAYERS ? 'Thinking' : 'Looking';
      }
      return 'Ready';
    case 'conceptChoice': {
      const hasChosen = !!game.round.concepts[id];
      return hasChosen ? 'Ready' : 'Thinking';
    }
    case 'createEntry': {
      if (selectors.playerHasSubmitted(state, id)) {
        return 'Ready';
      }

      const createPhase = game.round.phase as CreateEntryPhase;
      const isDrawingPhase = createPhase.index % 2 === 0;
      return isDrawingPhase ? 'Drawing' : 'Guessing';
    }
    case 'entryChoice': {
      const choicePhase = game.round.phase as EntryChoicePhase;
      const playerInTurn = game.round.order[choicePhase.index];
      const isPlayerTurn = playerInTurn === id;
      const stack = game.round.stacks[id];
      const alreadyChosen = !!stack.chosen;
      const alreadyAcknowledged = !!choicePhase.acknowledgedBy[id];

      if (alreadyAcknowledged) {
        return 'Ready';
      }

      if (alreadyChosen) {
        return isPlayerTurn ? 'Ready' : 'Looking';
      }

      return isPlayerTurn ? 'Thinking' : 'Looking';
    }
  }
};

const mapStateToProps = (state: RootState, ownProps: OwnProps): Props => {
  const player = selectors.player(state, ownProps.id) as Player;
  const isWaiting = selectors.isWaiting(state, ownProps.id);

  return {
    ...player,
    state: getPlayerState(state, ownProps.id, isWaiting),
  };
};

export default connect(mapStateToProps)(PlayerListItem);
