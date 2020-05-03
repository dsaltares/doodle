import { connect } from 'react-redux';

import GuessPhase from './GuessPhase';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/reducers';
import { submitConcept } from '../../store/game';
import {
  DrawingEntry,
  Entry,
} from '../../store/game/types';
import { selectors } from '../../store/game';

const mapStateToProps = (state: RootState) => {
  const entry = selectors.getSourceEntry(state) as Entry;
  const drawingEntry = entry.data as DrawingEntry;
  const author = selectors.player(state, entry.author);
  const message = `Guess what ${author?.name} drew`;
  const submitted = selectors.hasSubmitted(state);
  return {
    submitted,
    message,
    image: drawingEntry.drawing,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSubmit: (concept: string) => dispatch(submitConcept(concept)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GuessPhase);
