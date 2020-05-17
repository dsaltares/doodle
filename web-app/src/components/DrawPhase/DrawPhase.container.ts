import { connect } from 'react-redux';

import DrawPhase, { StateProps, DispatchProps } from './DrawPhase';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/reducers';
import { submitDrawing } from '../../store/game';
import { selectors } from '../../store/game';

const mapStateToProps = (state: RootState): StateProps => ({
  firstCreateTurn: selectors.isFirstCreateTurn(state),
  concept: selectors.currentConcept(state),
  conceptFrom: selectors.sourceEntryAuthor(state),
  submitted: selectors.hasSubmitted(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  onSubmit: (drawing: string): void => {
    dispatch(submitDrawing(drawing));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawPhase);
