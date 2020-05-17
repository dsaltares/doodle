import { connect } from 'react-redux';

import Game, { StateProps, DispatchProps } from './Game';
import { AppDispatch } from '../../store';
import {
  connectToGameChannel,
  leaveGame,
  dismissAlert,
} from '../../store/game';
import { RootState } from '../../store/reducers';

const mapStateToProps = (state: RootState): StateProps => {
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
    alert: state.game.alerts.length > 0 ? state.game.alerts[0] : undefined,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  connect: (): void => {
    dispatch(connectToGameChannel());
  },
  leave: (): void => {
    dispatch(leaveGame());
  },
  dismissAlert: (): void => {
    dispatch(dismissAlert());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
