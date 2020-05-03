import { connect } from 'react-redux';

import DrawPhase from './DrawPhase';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/reducers';
import { submitDrawing } from '../../store/game';
import {
  ConceptEntry,
  Entry,
} from '../../store/game/types';
import { selectors } from '../../store/game';

const getMessage = (state: RootState) => {
  if (selectors.isFirstCreateTurn(state)) {
    const concept = selectors.conceptForCurrentPlayer(state);
    return `Draw "${concept}"`;
  }

  const entry = selectors.getSourceEntry(state) as Entry;
  const author = selectors.player(state, entry.author);
  const conceptEntry = entry.data as ConceptEntry;
  const concept = conceptEntry.concept;
  return `From ${author?.name}, draw "${concept}"`;
};

const mapStateToProps = (state: RootState) => ({
  submitted: selectors.hasSubmitted(state),
  message: getMessage(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSubmit: (drawing: string) => dispatch(submitDrawing(drawing)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawPhase);
