import { connect } from 'react-redux';

import GuessPhase from './GuessPhase';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/reducers';
import { submitConcept } from '../../store/game';
import { selectors } from '../../store/game';

const mapStateToProps = (state: RootState) => ({
  submitted: selectors.hasSubmitted(state),
  author: selectors.sourceEntryAuthor(state),
  image: selectors.currentDrawing(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSubmit: (concept: string) => dispatch(submitConcept(concept)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GuessPhase);
