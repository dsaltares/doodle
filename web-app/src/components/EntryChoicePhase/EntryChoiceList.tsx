import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import useStyles from './EntryChoicePhase.styles';
import Emoji from '../Emoji';
import DoodleEntryCard from '../DoodleEntryCard';
import ConceptEntryCard from '../ConceptEntryCard';
import { Entry, DrawingEntry } from '../../store/game/types';

type Props = {
  entries: Entry[];
  concept: string;
  stackPlayerName: string;
  currentPlayerChooses: boolean;
  onChooseEntry: (playerId: string) => void;
};

const EntryChoiceList: FunctionComponent<Props> = ({
  entries,
  concept,
  stackPlayerName,
  currentPlayerChooses,
  onChooseEntry,
}) => {
  const classes = useStyles();

  const message = currentPlayerChooses
    ? `Choose your favourite entry for "${concept}".`
    : `${stackPlayerName} is choosing their favourite entry for "${concept}".`;
  const emoji = currentPlayerChooses ? '🤔' : '😅';

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
                <Typography>
                  <Emoji symbol={emoji} />
                  <span> {message}</span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <img
                  className={classes.img}
                  src={drawingEntry.drawing}
                  alt={`Initial drawing by ${stackPlayerName}`}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {otherEntries.map((entry) => {
          const entryCard =
            entry.data.type === 'drawing' ? (
              <DoodleEntryCard
                playerId={entry.author}
                image={entry.data.drawing}
                onClick={
                  currentPlayerChooses
                    ? (): void => {
                        onChooseEntry(entry.author);
                      }
                    : undefined
                }
              />
            ) : (
              <ConceptEntryCard
                playerId={entry.author}
                concept={entry.data.concept}
                onClick={
                  currentPlayerChooses
                    ? (): void => {
                        onChooseEntry(entry.author);
                      }
                    : undefined
                }
              />
            );
          return (
            <Grid item xs={12} key={entry.author}>
              <Paper
                elevation={1}
                variant="outlined"
                className={classes.entryPaper}
              >
                {entryCard}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default EntryChoiceList;
