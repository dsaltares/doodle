import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import useStyles from './InitialPhase.styles';
import Emoji from '../Emoji';

type Props = {
  message: string,
  startVisible: boolean,
  startDisabled: boolean,
  onStart: () => void,
};

const InitialPhase: FunctionComponent<Props> = ({
  message,
  startVisible,
  startDisabled,
  onStart,
}) => {
  const classes = useStyles();

  const startButton = startVisible
    ? (
      <Button
        variant="contained"
        color="primary"
        disabled={startDisabled}
        onClick={onStart}
      >
        <Emoji symbol="🚀" />
        <span>Start!</span>
      </Button>
    )
    : null;

  return (
    <Grid item xs={4}>
      <Paper elevation={1} variant="outlined" className={classes.paper}>
        <Grid container direction="column" justify="center" spacing={2}>
          <Grid item xs={12}>
            <Typography>{message}</Typography>
          </Grid>
          <Grid item xs={12}>
            {startButton}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default InitialPhase;
