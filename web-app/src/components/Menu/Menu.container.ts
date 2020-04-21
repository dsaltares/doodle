import { connect } from 'react-redux';

import Menu, { StartGameParams } from './Menu';
import { AppDispatch } from '../../store';
import { createGame, joinGame } from '../../store/game';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  startGame: ({ mode, name, code, goToGame }: StartGameParams) => {
    if (mode === 'newGame') {
      dispatch(createGame({ name, goToGame }));
    } else {
      dispatch(joinGame({ name, code, goToGame }));
    }
  },
});

export default connect(null, mapDispatchToProps)(Menu);
