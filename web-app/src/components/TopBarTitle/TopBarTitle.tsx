import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

const TopBarTitle = () => (
  <Grid
    container
    direction="row"
    justify="flex-start"
    alignItems="center"
    spacing={2}
  >
    <Hidden smUp implementation="css">
      <Grid item>
        <Typography variant="h6" color="inherit" noWrap>
          Doodle
        </Typography>
      </Grid>
    </Hidden>
    <Hidden xsDown implementation="css">
      <Grid item>
        <Typography variant="h6" color="inherit" noWrap>
          Doodle - A crazy draw/guess chain game
        </Typography>
      </Grid>
    </Hidden>
  </Grid>
);

export default TopBarTitle;
