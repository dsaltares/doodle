import { connect } from 'react-redux';

import Game from './Game';
import { AppDispatch } from '../../store';
import { connectToGameChannel } from '../../store/game';


const mapDispatchToProps = (dispatch: AppDispatch) => ({
  connect: () => dispatch(connectToGameChannel()),
});

export default connect(null, mapDispatchToProps)(Game);
