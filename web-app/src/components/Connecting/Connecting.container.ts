import { connect } from 'react-redux';

import Connecting from './Connecting';
import { RootState } from '../../store/reducers';

const mapStateToProps = (state: RootState) => ({
  hasError: state.socket.hasError,
});

export default connect(mapStateToProps)(Connecting);
