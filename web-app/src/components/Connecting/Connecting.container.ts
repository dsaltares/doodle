import { connect } from 'react-redux';

import Connecting, { Props } from './Connecting';
import { RootState } from '../../store/reducers';

const mapStateToProps = (state: RootState): Props => ({
  hasError: state.socket.hasError,
});

export default connect(mapStateToProps)(Connecting);
