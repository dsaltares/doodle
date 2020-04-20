import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import useStyles from './ConceptChoicePhase.styles';
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
  const classes = useStyles();

  return (
    <Grid item xs={5}>
      <Paper elevation={1} variant="outlined" className={classes.paper}>
        <Grid container direction="column">
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
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ConceptChoicePhase;
