import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import MainContent from '../MainContent';
import InstructionList from './InstructionList';

const HowToPlayPanel: FunctionComponent = () => (
  <MainContent>
    <Grid item>
      <Typography variant="h5">How to play</Typography>
    </Grid>
    <Grid item>
      <InstructionList />
    </Grid>
  </MainContent>
);

export default HowToPlayPanel;
