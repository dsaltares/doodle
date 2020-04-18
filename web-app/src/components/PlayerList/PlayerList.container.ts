import { connect } from 'react-redux';
import PlayerList from './PlayerList';
import { RootState } from '../../store/reducers';
import { selectors } from '../../store/game';

const mapStateToProps = (state: RootState) => ({
  playerIds: selectors.playerIds(state),
});

export default connect(mapStateToProps)(PlayerList);
