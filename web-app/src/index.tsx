import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './components/App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
