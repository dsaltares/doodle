import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import useStyles from './MainContent.styles';

type Props = {
  width?: number,
};

const MainContent: FunctionComponent<Props> = ({
  children,
  width = 500,
}) => {
  const classes = useStyles({ width });

  return (
    <Grid item xs={12}>
      <Paper variant="outlined" className={classes.paper}>
        <Grid container direction="column" spacing={2}>
          {children}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default MainContent;
