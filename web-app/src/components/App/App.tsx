import React, {
  useState,
  FunctionComponent,
} from 'react';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

import history from '../../history';
import Menu from '../Menu';
import Game from '../Game';
import JoinMenu from '../JoinMenu';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import useStyles from './App.styles';
import useMountEffect from '../../utils/useMountEffect';

type Props = {
  playerName?: string,
  connect: () => void,
}

const App: FunctionComponent<Props> = ({
  playerName,
  connect,
}) => {
  useMountEffect(() => {
    connect();
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const onToggleDrawer = () => setDrawerOpen(!drawerOpen);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar onToggleDrawer={onToggleDrawer} />
      <SideBar
        drawerOpen={drawerOpen}
        onToggleDrawer={onToggleDrawer}
      />
      <div className={classes.content}>
        <Toolbar />
        <Grid container justify="center">
          <Router history={history}>
            <Switch>
              <Route exact path='/'>
                <Menu />
              </Route>
              <Route exact path='/game/:code'>
                {
                  playerName
                    ? <Game />
                    : <JoinMenu />
                }
              </Route>
            </Switch>
          </Router>
        </Grid>
      </div>
    </div>
  );
};

export default App;
