import React, { FunctionComponent } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './TopBar.styles';
import TopBarLinks from '../TopBarLinks';

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
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={onToggleDrawer}
                  className={classes.drawerButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="inherit" noWrap>
                  doodle.io
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <TopBarLinks />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
