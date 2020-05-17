import { connect } from 'react-redux';

import DrawPhase from './DrawPhase';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/reducers';
import { submitDrawing } from '../../store/game';
import { selectors } from '../../store/game';

const mapStateToProps = (state: RootState) => ({
  firstCreateTurn: selectors.isFirstCreateTurn(state),
  concept: selectors.currentConcept(state),
  conceptFrom: selectors.sourceEntryAuthor(state),
  submitted: selectors.hasSubmitted(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSubmit: (drawing: string) => dispatch(submitDrawing(drawing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawPhase);
