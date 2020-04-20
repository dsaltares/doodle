import React, { FunctionComponent } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import Toolbar from '@material-ui/core/Toolbar';

import useStyles from './SideBar.styles';
import PlayerList from '../PlayerList';

type Props = {
  drawerOpen: boolean,
  onToggleDrawer: () => void,
}

const SideBar: FunctionComponent<Props> = ({
  drawerOpen,
  onToggleDrawer,
}) => {
  const classes = useStyles();

  const drawer = (
    <React.Fragment>
      <Toolbar />
      <div className={classes.drawerContainer}>
        <PlayerList />
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          open={drawerOpen}
          onClose={onToggleDrawer}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

export default SideBar;
