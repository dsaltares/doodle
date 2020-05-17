import { connect } from 'react-redux';

import GuessPhase, { StateProps, DispatchProps } from './GuessPhase';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/reducers';
import { submitConcept } from '../../store/game';
import { selectors } from '../../store/game';

const mapStateToProps = (state: RootState): StateProps => ({
  submitted: selectors.hasSubmitted(state),
  author: selectors.sourceEntryAuthor(state),
  image: selectors.currentDrawing(state) as string,
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  onSubmit: (concept: string): void => {
    dispatch(submitConcept(concept));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GuessPhase);
