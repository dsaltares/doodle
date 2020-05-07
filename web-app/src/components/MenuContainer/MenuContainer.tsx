import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import useStyles from './MenuContainer.styles';

const MenuContainer: FunctionComponent = ({
  children,
}) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.paper}>
      <Grid container direction="column" spacing={2}>
        {children}
      </Grid>
    </Paper>
  );
};

export default MenuContainer;
