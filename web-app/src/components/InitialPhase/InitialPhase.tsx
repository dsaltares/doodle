import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import MainContent from '../MainContent';
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
    <MainContent>
      <Grid item xs={12}>
        <Typography>{message}</Typography>
      </Grid>
      <Grid item xs={12}>
        {startButton}
      </Grid>
    </MainContent>
  );
};

export default InitialPhase;
