import React from 'react';
import Drawer from '@material-ui/core/Drawer';

import Toolbar from '@material-ui/core/Toolbar';

import useStyles from './SideBar.styles';
import PlayerList from '../PlayerList';

const SideBar = () => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <PlayerList />
      </div>
    </Drawer>
  );
};

export default SideBar;
