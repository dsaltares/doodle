import { connect } from 'react-redux';
import WaitingPlayerList, { Props } from './WaitingPlayerList';
import { RootState } from '../../store/reducers';
import { selectors } from '../../store/game';

const mapStateToProps = (state: RootState): Props => {
  const game = state.game.gameState;
  return {
    visible: !!game && Object.keys(game.waitingPlayers).length > 0,
    playerIds: selectors.waitingPlayerIds(state),
  };
};

export default connect(mapStateToProps)(WaitingPlayerList);
