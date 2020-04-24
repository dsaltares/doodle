import React, {
  FunctionComponent,
  useState,
} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import copy from 'copy-to-clipboard';

import MainContent from '../MainContent';
import Emoji from '../Emoji';
import useStyles from './InitialPhase.styles';

type Props = {
  message: string,
  startVisible: boolean,
  startDisabled: boolean,
  gameFull: boolean,
  gameUrl: string,
  onStart: () => void,
};

const InitialPhase: FunctionComponent<Props> = ({
  message,
  startVisible,
  startDisabled,
  onStart,
  gameFull,
  gameUrl,
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

  const [alertOpen, setAlertOpen] = useState(false);
  const handleInviteClicked = () => {
    copy(gameUrl);
    setAlertOpen(true);
  }
  const handleAlertClosed = () => setAlertOpen(false);

  return (
    <MainContent>
      <Grid item xs={12}>
        <Typography>{message}</Typography>
      </Grid>
      <Grid
        container direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.buttonContainer}
      >
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            disabled={gameFull}
            onClick={handleInviteClicked}
          >
            Invite friends
          </Button>
          <Snackbar
            open={alertOpen}
            autoHideDuration={5000}
            onClose={handleAlertClosed}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleAlertClosed} severity="success">
              Game code copied to clipboard!
            </Alert>
          </Snackbar>
        </Grid>
        <Grid item>
          {startButton}
        </Grid>
      </Grid>
    </MainContent>
  );
};

export default InitialPhase;
