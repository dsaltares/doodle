import { connect } from 'react-redux';

import App, { StateProps, DispatchProps } from './App';
import { AppDispatch } from '../../store';
import { connect as connectToSocket } from '../../store/socket';
import { subscribe } from '../../store/game';
import { RootState } from '../../store/reducers';

const mapStateToProps = (state: RootState): StateProps => ({
  playerName: state.game.config.name,
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  connect: (): void => {
    dispatch(
      connectToSocket((socket) => {
        subscribe(dispatch, socket);
      })
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
