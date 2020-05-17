import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Emoji from '../Emoji';
import DoodleEntryCard from '../DoodleEntryCard';
import ConceptEntryCard from '../ConceptEntryCard';
import { Entry } from '../../store/game/types';
import useStyles from './EntryChoicePhase.styles';

type Props = {
  winningEntry: Entry;
  concept: string;
  stackPlayerName: string;
  currentPlayerChose: boolean;
  chosenPlayerName: string;
  acknowledged: boolean;
  onAcknowledge: () => void;
};

const EntryChoiceAcknowledge: FunctionComponent<Props> = ({
  winningEntry,
  concept,
  stackPlayerName,
  currentPlayerChose,
  chosenPlayerName,
  acknowledged,
  onAcknowledge,
}) => {
  const classes = useStyles();

  const message = currentPlayerChose
    ? `You chose the entry by ${chosenPlayerName} for "${concept}"!`
    : `${stackPlayerName} chose the entry by ${chosenPlayerName} for "${concept}"!`;

  const entryCard =
    winningEntry.data.type === 'drawing' ? (
      <DoodleEntryCard
        playerId={winningEntry.author}
        image={winningEntry.data.drawing}
      />
    ) : (
      <ConceptEntryCard
        playerId={winningEntry.author}
        concept={winningEntry.data.concept}
      />
    );

  const nextButton = !currentPlayerChose ? (
    <Grid item xs={12}>
      <Button
        variant="contained"
        color="primary"
        disabled={acknowledged}
        onClick={onAcknowledge}
      >
        <Emoji symbol="👏" />
        <span>Next</span>
      </Button>
    </Grid>
  ) : null;

  return (
    <Grid item xs={12}>
      <Paper elevation={1} variant="outlined" className={classes.paper}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <Emoji symbol="🥳" />
              <span> {message}</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {entryCard}
          </Grid>
          {nextButton}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default EntryChoiceAcknowledge;
