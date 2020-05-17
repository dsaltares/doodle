import { connect } from 'react-redux';

import TopBarLinks, { Props } from './TopBarLinks';
import { RootState } from '../../store/reducers';

const mapStateToProps = (state: RootState): Props => {
  const game = state.game.gameState;
  return {
    gameStarted: !!game && game.round.phase.name !== 'initial',
  };
};

export default connect(mapStateToProps)(TopBarLinks);
