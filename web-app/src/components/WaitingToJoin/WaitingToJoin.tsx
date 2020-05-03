import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import MainContent from '../MainContent';
import Emoji from '../Emoji';


const WaitingToJoin = () => (
  <MainContent>
    <Grid container direction="row" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h4"><Emoji symbol="✏️"/></Typography>
      </Grid>
      <Grid item>
        <Typography>You will join the game in the next round.</Typography>
      </Grid>
    </Grid>
  </MainContent>
);

export default WaitingToJoin;
