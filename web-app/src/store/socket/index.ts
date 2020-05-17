import { createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import defer from 'p-defer';
import { AppDispatch } from '..';
import { SocketState } from './types';
import { LIVE_SERVER_SOCKET } from '../endpoints';

const initialState: SocketState = {
  status: 'disconnected',
  hasError: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connectToSocketStarted: (state): void => {
      state.status = 'connecting';
    },
    connectToSocketSuccess: (state): void => {
      state.status = 'connected';
      state.hasError = false;
    },
    connectToSocketFailed: (state): void => {
      state.status = 'error';
      state.hasError = true;
    },
    disconnected: (state): void => {
      state.status = 'disconnected';
      state.hasError = true;
    },
  },
});

const { actions, reducer } = socketSlice;

export default reducer;

export let socket: SocketIOClient.Socket;

export const socketDeferred = defer<SocketIOClient.Socket>();

export const connect = (
  subscribe: (socket: SocketIOClient.Socket) => void
) => async (dispatch: AppDispatch): Promise<void> => {
  dispatch(actions.connectToSocketStarted());

  socket = io(LIVE_SERVER_SOCKET);
  socketDeferred.resolve(socket);

  const successEvents = ['connect', 'reconnect'];
  successEvents.forEach((event) => {
    socket.on(event, () => {
      dispatch(actions.connectToSocketSuccess());
      subscribe(socket);
    });
  });

  const errorEvents = [
    'connect_error',
    'connect_timeout',
    'error',
    'disconnected',
  ];
  errorEvents.forEach((event) => {
    socket.on(event, () => {
      dispatch(actions.connectToSocketFailed());
    });
  });

  socket.on('reconnecting', () => {
    dispatch(actions.connectToSocketStarted());
  });
};
