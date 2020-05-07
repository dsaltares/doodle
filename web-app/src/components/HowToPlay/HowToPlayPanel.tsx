import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import MenuContainer from '../MenuContainer';
import InstructionList from './InstructionList';

const HowToPlayPanel = () => (
  <MenuContainer>
    <Grid item>
      <Typography variant="h5">How to play</Typography>
    </Grid>
    <Grid item>
      <InstructionList />
    </Grid>
  </MenuContainer>
);

export default HowToPlayPanel;
