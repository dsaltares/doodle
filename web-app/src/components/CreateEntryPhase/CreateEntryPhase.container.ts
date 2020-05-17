import { connect } from 'react-redux';

import CreateEntryPhase, { EntryType } from './CreateEntryPhase';
import { RootState } from '../../store/reducers';
import { CreateEntryPhase as CreateEntryPhaseType } from '../../store/game/types';

const mapStateToProps = (state: RootState) => {
  const phase = state.game.gameState?.round.phase as CreateEntryPhaseType;
  const type: EntryType = phase.index % 2 === 0 ? 'draw' : 'guess';

  return { type };
};

export default connect(mapStateToProps)(CreateEntryPhase);
