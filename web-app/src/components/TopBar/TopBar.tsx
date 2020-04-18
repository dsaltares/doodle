import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import useStyles from './TopBar.styles';

const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar >
        <Typography variant="h6" color="inherit" noWrap>
          doodle.io
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
