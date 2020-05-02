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
  if (!state.game.gameState) {
    return {
      connected: false,
      phaseName: '',
    };
  }

  return {
    connected: true,
    phaseName: state.game.gameState.round.phase.name,
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
