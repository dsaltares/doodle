import { connect } from 'react-redux';
import PlayerListItem from './PlayerListItem';
import { RootState } from '../../store/reducers';
import { selectors } from '../../store/game';

type Props = {
  id: string
}

const mapStateToProps = (state: RootState, ownProps: Props) => {
  const player = selectors.player(state, ownProps.id);

  return player;
}

export default connect(mapStateToProps)(PlayerListItem);
