import React, { FunctionComponent } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './TopBar.styles';

type Props = {
  onToggleDrawer: () => void,
};

const TopBar: FunctionComponent<Props> = ({
  onToggleDrawer,
}) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onToggleDrawer}
          className={classes.drawerButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          doodle.io
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
