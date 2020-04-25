import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import useStyles from './MenuContainer.styles';

type Props = {
  centered?: boolean,
};

const MenuContainer: FunctionComponent<Props> = ({
  children,
}) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Paper variant="outlined" className={classes.paper}>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={2}>
            {children}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default MenuContainer;
