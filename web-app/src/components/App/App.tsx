import React, { useState, FunctionComponent } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Toolbar from '@material-ui/core/Toolbar';

import Menu from '../Menu';
import Game from '../Game';
import JoinMenu from '../JoinMenu';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import useStyles from './App.styles';
import useMountEffect from '../../utils/useMountEffect';

export type StateProps = {
  playerName?: string;
};

export type DispatchProps = {
  connect: () => void;
};

type Props = StateProps & DispatchProps;

const App: FunctionComponent<Props> = ({ playerName, connect }) => {
  useMountEffect(() => {
    connect();
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const onToggleDrawer = (): void => {
    setDrawerOpen(!drawerOpen);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar onToggleDrawer={onToggleDrawer} />
      {playerName ? (
        <SideBar drawerOpen={drawerOpen} onToggleDrawer={onToggleDrawer} />
      ) : null}
      <div className={classes.content}>
        <Toolbar />
        <HashRouter>
          <Switch>
            <Route exact path="/">
              <Menu />
            </Route>
            <Route exact path="/game/:code">
              {playerName ? <Game /> : <JoinMenu />}
            </Route>
          </Switch>
        </HashRouter>
      </div>
    </div>
  );
};

export default App;
