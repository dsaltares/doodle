import React, { FunctionComponent, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import copy from 'copy-to-clipboard';

import MainContent from '../MainContent';
import Emoji from '../Emoji';
import { HowToPlayPanel } from '../HowToPlay';
import useStyles from './InitialPhase.styles';
import pluralize from '../../utils/pluralize';

export type StateProps = {
  createdGame: boolean;
  creatorName: string;
  missingPlayers: number;
  gameFull: boolean;
  gameUrl: string;
};

export type DispatchProps = {
  onStart: () => void;
};

type Props = StateProps & DispatchProps;

const InitialPhase: FunctionComponent<Props> = ({
  createdGame,
  creatorName,
  missingPlayers,
  onStart,
  gameFull,
  gameUrl,
}) => {
  const classes = useStyles();

  const startButton = createdGame ? (
    <Button
      variant="contained"
      color="primary"
      disabled={missingPlayers > 0}
      onClick={onStart}
    >
      <Emoji symbol="🚀" />
      <span>Start!</span>
    </Button>
  ) : null;

  let message = '';
  if (missingPlayers > 0) {
    message = `Waiting for ${missingPlayers} more ${pluralize(
      'player',
      'players',
      missingPlayers
    )}.`;
  } else if (createdGame) {
    message = 'Ready to start?';
  } else {
    message = `Waiting for ${creatorName} to start the game.`;
  }

  const [alertOpen, setAlertOpen] = useState(false);
  const handleInviteClicked = (): void => {
    copy(gameUrl);
    setAlertOpen(true);
  };
  const handleAlertClosed = (): void => {
    setAlertOpen(false);
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <MainContent>
          <Grid item xs={12}>
            <Typography>{message}</Typography>
          </Grid>
          <Grid
            container
            direction="row"
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
            <Grid item>{startButton}</Grid>
          </Grid>
        </MainContent>
      </Grid>
      <Grid item>
        <HowToPlayPanel />
      </Grid>
    </Grid>
  );
};

export default InitialPhase;
