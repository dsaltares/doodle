import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import useStyles from './EntryChoicePhase.styles';
import Emoji from '../Emoji';
import DoodleEntryCard from '../DoodleEntryCard';
import ConceptEntryCard from '../ConceptEntryCard';
import { Entry, DrawingEntry } from '../../store/game/types';

type Props = {
  entries: Entry[],
  concept: string,
  stackPlayerName: string,
  currentPlayerChooses: boolean,
  chosenPlayerName?: string,
  acknowledged: boolean,
  onChooseEntry: (playerId: string) => void,
  onAcknowledge: () => void,
};

const EntryChoicePhase: FunctionComponent<Props> = ({
  entries,
  concept,
  stackPlayerName,
  currentPlayerChooses,
  chosenPlayerName = '',
  acknowledged,
  onChooseEntry,
  onAcknowledge,
}) => {
  const classes = useStyles();

  const getMessage = () => {
    if (currentPlayerChooses) {
      return chosenPlayerName
        ? `You chose the entry by ${chosenPlayerName} for "${concept}"!`
        : `Choose your favorite entry for "${concept}"`;
    }

    return chosenPlayerName
      ? `${stackPlayerName} chose the entry by ${chosenPlayerName} for "${concept}"!`
      : `${stackPlayerName} is choosing their favorite entry for "${concept}"`;
  }

  const firstEntry = entries[0];
  const drawingEntry = firstEntry.data as DrawingEntry;
  const otherEntries = entries.slice(1);

  return (
    <Grid item xs={12}>
      <Grid container direction="column" spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={1} variant="outlined" className={classes.paper}>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <Typography>{getMessage()}</Typography>
              </Grid>
              <Grid item xs={12}>
                <img
                  className={classes.img}
                  src={drawingEntry.drawing}
                  alt={`Initial drawing by ${stackPlayerName}`}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!chosenPlayerName || acknowledged}
                  onClick={onAcknowledge}
                >
                  <Emoji symbol="👏"/>
                  <span>Next</span>
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
          {
            otherEntries.map((entry) => {
              const entryCard = entry.data.type === 'drawing'
                ? (
                  <DoodleEntryCard
                    playerId={entry.author}
                    image={entry.data.drawing}
                    onClick={
                      currentPlayerChooses
                        ? () => onChooseEntry(entry.author)
                        : undefined
                    }
                  />
                )
                : (
                  <ConceptEntryCard
                    playerId={entry.author}
                    concept={entry.data.concept}
                    onClick={
                      currentPlayerChooses
                        ? () => onChooseEntry(entry.author)
                        : undefined
                    }
                  />
                );
              return (
                <Grid item xs={12}>
                  <Paper elevation={1} variant="outlined" className={classes.paper}>
                    {entryCard}
                  </Paper>
                </Grid>
              );
            }
          )
        }
      </Grid>
    </Grid>
  );
};

export default EntryChoicePhase;
