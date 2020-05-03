import { connect } from 'react-redux';

import Game from './Game';
import { AppDispatch } from '../../store';
import {
  connectToGameChannel,
  leaveGame,
  dismissAlert,
} from '../../store/game';
import { RootState } from '../../store/reducers';

const mapStateToProps = (state: RootState) => {
  const game = state.game.gameState;
  const playerId = state.game.player;

  if (!game || !playerId) {
    return {
      connected: false,
      waitingToJoin: false,
      phaseName: '',
    };
  }

  return {
    connected: true,
    waitingToJoin: !!game.waitingPlayers[playerId],
    phaseName: game.round.phase.name,
    alert: state.game.alerts.length > 0
      ? state.game.alerts[0]
      : undefined,
  };
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  connect: () => dispatch(connectToGameChannel()),
  leave: () => dispatch(leaveGame()),
  dismissAlert: () => dispatch(dismissAlert()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
