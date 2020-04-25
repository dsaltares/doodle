import { connect } from 'react-redux';
import PlayerListItem, { PlayerState } from './PlayerListItem';
import { RootState } from '../../store/reducers';
import { selectors } from '../../store/game';
import {
  CreateEntryPhase,
  EntryChoicePhase,
  Player,
} from '../../store/game/types';
import { MIN_PLAYERS } from '../../store/game/constants';

type Props = {
  id: string
}

const getPlayerState = (state: RootState, id: string): PlayerState | undefined => {
  if (!state.game.gameState) {
    return;
  }

  const game = state.game.gameState;
  const createdByCurrentPlayer = game.createdBy === id;
  const numPlayers = Object.keys(game.players).length;

  switch(game.round.phase.name) {
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
      const createPhase = game.round.phase as CreateEntryPhase;
      const playerIdx = game.round.order.indexOf(id);
      const targetPlayerIdx = (playerIdx + createPhase.index) % numPlayers;
      const targetPlayerId = game.round.order[targetPlayerIdx];
      const stack = game.round.stacks[targetPlayerId];
      const stackHasEntryByPlayer = !!stack.entries.find(entry => entry.author === id);

      if (stackHasEntryByPlayer) {
        return 'Ready';
      }

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

const mapStateToProps = (state: RootState, ownProps: Props) => {
  const player = selectors.player(state, ownProps.id) as Player;

  return {
    ...player,
    state: getPlayerState(state, ownProps.id),
  };
}

export default connect(mapStateToProps)(PlayerListItem);
