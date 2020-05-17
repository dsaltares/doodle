import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import useStyles from './Connecting.styles';
import Emoji from '../Emoji';

type Props = {
  hasError: boolean;
};

const Connecting: FunctionComponent<Props> = ({ hasError }) => {
  const classes = useStyles();
  const severity = hasError ? 'error' : 'info';
  const message = hasError ? (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <Typography variant="h4">
          <Emoji symbol="🙈" />
        </Typography>
      </Grid>
      <Grid item>Failed to connect, retrying...</Grid>
    </Grid>
  ) : (
    'Connecting...'
  );
  return (
    <Grid item xs={12}>
      <Alert
        icon={false}
        className={classes.alert}
        variant="outlined"
        severity={severity}
      >
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
          <Grid item>{message}</Grid>
        </Grid>
      </Alert>
    </Grid>
  );
};

export default Connecting;
