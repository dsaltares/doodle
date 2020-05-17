import { connect } from 'react-redux';
import PlayerList from './PlayerList';
import { RootState } from '../../store/reducers';
import { selectors } from '../../store/game';
import { MIN_PLAYERS, MAX_PLAYERS } from '../../store/game/constants';

const mapStateToProps = (state: RootState) => ({
  visible: !!state.game.player,
  playerIds: selectors.playerIds(state),
  minPlayers: MIN_PLAYERS,
  maxPlayers: MAX_PLAYERS,
  gameStarted: Boolean(
    state.game.gameState && state.game.gameState.round.phase.name !== 'initial'
  ),
});

export default connect(mapStateToProps)(PlayerList);
