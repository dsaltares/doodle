import { connect } from 'react-redux';

import ConceptChoicePhase from './ConceptChoicePhase';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/reducers';
import { chooseConcept } from '../../store/game';
import {
  ConceptChoicePhase as ConceptChoicePhaseType,
  Round,
} from '../../store/game/types';

const mapStateToProps = (state: RootState) => {
  const choosingConcept = state.game.choosingConcept;
  const round = state.game.gameState?.round as Round;
  const phase = round.phase as ConceptChoicePhaseType;
  const playerId = state.game.player as string;
  const concepts = phase.choices[playerId];
  const selectedConcept = round.concepts[playerId];

  return {
    selectedConcept: selectedConcept || choosingConcept,
    concepts,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onChooseConcept: (concept: string) => dispatch(chooseConcept(concept)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConceptChoicePhase);
