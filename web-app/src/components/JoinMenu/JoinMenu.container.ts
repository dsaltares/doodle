import JoinMenu from './JoinMenu';
import { connect } from 'react-redux';
import { AppDispatch } from '../../store';
import { joinGame } from '../../store/game';
import { JoinGameParams } from '../../store/game/types';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  joinGame: (params: JoinGameParams) => {
    dispatch(joinGame(params));
  },
});

export default connect(null, mapDispatchToProps)(JoinMenu);
