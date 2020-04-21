import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
}) => {
  const message = selectedConcept
    ? 'Waiting for other players to choose'
    : 'Choose a concept';

  return (
    <MainContent>
      <Grid item xs={12}>
        <Typography>{message}</Typography>
      </Grid>
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
};

export default ConceptChoicePhase;
