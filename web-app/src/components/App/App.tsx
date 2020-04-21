import React, {
  useState,
  FunctionComponent,
} from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

import Menu from '../Menu';
import Game from '../Game';
import JoinMenu from '../JoinMenu';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import useStyles from './App.styles';
import useMountEffect from '../../utils/useMountEffect';

const publicPath = process.env.NODE_ENV === 'development'
  ? '/'
  : '/doodle';

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
          <BrowserRouter basename={publicPath}>
            <Switch>
              <Route exact path="/">
                <Menu />
              </Route>
              <Route exact path="/game/:code">
                {
                  playerName
                    ? <Game />
                    : <JoinMenu />
                }
              </Route>
            </Switch>
          </BrowserRouter>
        </Grid>
      </div>
    </div>
  );
};

export default App;
