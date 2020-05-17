import { connect } from 'react-redux';

import ConceptEntryCard from './ConceptEntryCard';
import { RootState } from '../../store/reducers';
import { GameState } from '../../store/game/types';

interface OwnProps {
  playerId: string;
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const game = state.game.gameState as GameState;
  const player = game.players[ownProps.playerId];
  return {
    name: player.name,
    avatar: player.avatar,
  };
};
export default connect(mapStateToProps)(ConceptEntryCard);
