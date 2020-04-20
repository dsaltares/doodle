import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';

import MainContent from '../MainContent';
import ConceptListItem from '../ConceptListItem';

type Props = {
  concepts: string[],
  selectedConcept?: string,
  onChooseConcept: (concept: string) => void,
};

const ConceptChoicePhase: FunctionComponent<Props> = ({
  concepts,
  selectedConcept,
  onChooseConcept,
}) => (
  <MainContent>
    <Grid item xs={12}>
      <List>
        {
          concepts.map(concept => (
            <ConceptListItem
              key={concept}
              concept={concept}
              selected={selectedConcept === concept}
              disabled={!!selectedConcept}
              onClick={() => onChooseConcept(concept)}
            />
          ))
        }
      </List>
    </Grid>
  </MainContent>
);

export default ConceptChoicePhase;
