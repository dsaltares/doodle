import { connect } from 'react-redux';

import Game from './Game';
import { AppDispatch } from '../../store';
import { connectToGameChannel } from '../../store/game';
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
  };
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  connect: () => dispatch(connectToGameChannel()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
