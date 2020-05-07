import { connect } from 'react-redux';

import TopBarLinks from './TopBarLinks';
import { RootState } from '../../store/reducers';

const mapStateToProps = (state: RootState) => {
  const game = state.game.gameState;
  return {
    gameStarted: !!game && game.round.phase.name !== 'initial',
  };
};

export default connect(mapStateToProps)(TopBarLinks);
