import { connect } from 'react-redux';

import JoinMenu, { DispatchProps } from './JoinMenu';
import { AppDispatch } from '../../store';
import { joinGame } from '../../store/game';
import { JoinGameParams } from '../../store/game/types';

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  joinGame: (params: JoinGameParams): void => {
    dispatch(joinGame(params));
  },
});

export default connect(null, mapDispatchToProps)(JoinMenu);
