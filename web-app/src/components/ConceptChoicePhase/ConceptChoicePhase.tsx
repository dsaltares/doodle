import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import MainContent from '../MainContent';
import Emoji from '../Emoji';
import ConceptListItem from '../ConceptListItem';

export type StateProps = {
  concepts: string[];
  selectedConcept?: string;
};

export type DispatchProps = {
  onChooseConcept: (concept: string) => void;
};

type Props = StateProps & DispatchProps;

const ConceptChoicePhase: FunctionComponent<Props> = ({
  concepts,
  selectedConcept,
  onChooseConcept,
}) => {
  const emoji = selectedConcept ? '⏳' : '🤫';
  const message = selectedConcept
    ? 'You will start drawing as soon as every player has chosen what to draw.'
    : 'Choose what to draw. Keep it a secret!';

  return (
    <MainContent>
      <Grid item xs={12}>
        <Typography>
          <Emoji symbol={emoji} />
          <span> {message}</span>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
          {concepts.map((concept) => (
            <ConceptListItem
              key={concept}
              concept={concept}
              selected={selectedConcept === concept}
              disabled={!!selectedConcept}
              onClick={(): void => {
                onChooseConcept(concept);
              }}
            />
          ))}
        </List>
      </Grid>
    </MainContent>
  );
};

export default ConceptChoicePhase;
