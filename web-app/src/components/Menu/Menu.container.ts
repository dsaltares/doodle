import Menu, { StartGameParams } from './Menu';
import { connect } from 'react-redux';
import { AppDispatch } from '../../store';
import { createGame, joinGame } from '../../store/game';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  startGame: ({ mode, name, code }: StartGameParams) => {
    if (mode === 'newGame') {
      dispatch(createGame({ name }));
    } else {
      dispatch(joinGame({ name, code }));
    }
  },
});

export default connect(null, mapDispatchToProps)(Menu);
