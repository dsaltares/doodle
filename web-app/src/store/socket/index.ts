import { createSlice } from "@reduxjs/toolkit";
import io from 'socket.io-client';
import defer from 'p-defer';
import { AppDispatch } from '..';
import { SocketState } from "./types";
import { LIVE_SERVER_URL } from '../endpoints';

const initialState: SocketState = {
  status: 'disconnected',
}

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connectToSocketStarted: state => {
      state.status = 'connecting';
    },
    connectToSocketSuccess: (state) => {
      state.status = 'connected';
    },
    connectToSocketFailed: state => {
      state.status = 'error'
    },
    disconnected: state => {
      state.status = 'disconnected';
    },
  }
});

const { actions, reducer } = socketSlice;

export default reducer;

export let socket: SocketIOClient.Socket;

export const socketDeferred = defer<SocketIOClient.Socket>();

export const connect = (subscribe: (socket: SocketIOClient.Socket) => void) => async (dispatch: AppDispatch) => {
  dispatch(actions.connectToSocketStarted());

  socket = io(LIVE_SERVER_URL);
  socketDeferred.resolve(socket);

  const successEvents = ['connect', 'reconnect'];
  successEvents.forEach(event => {
    socket.on(event, () => {
      dispatch(actions.connectToSocketSuccess());
      subscribe(socket);
    });
  })

  const errorEvents = ['connect_error', 'connect_timeout', 'error', 'disconnected'];
  errorEvents.forEach(event => {
    socket.on(event, () => {
      dispatch(actions.connectToSocketFailed());
    });
  })

  socket.on('reconnecting', () => {
    dispatch(actions.connectToSocketStarted());
  });
};
