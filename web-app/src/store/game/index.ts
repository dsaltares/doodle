import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { AppDispatch, AppGetState } from '..';
import { socketDeferred } from '../socket';
import {
  GameSliceState,
  CreateGameParams,
  GameJoinedEvent,
  GameUpdatedEvent,
  JoinGameParams,
} from "./types";
import history from '../../history';
import { ENDPOINT } from '../constants';
import * as selectors from './selectors';

const initialState: GameSliceState = {
  config: {},
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.config.name = action.payload;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.config.code = action.payload;
    },
    updateGame: (state, action: PayloadAction<GameUpdatedEvent>) => {
      if (state.gameState && state.gameState.lastUpdate > action.payload.gameState.lastUpdate) {
        return state;
      }
      state.gameState = action.payload.gameState;
    },
    setGamePlayer: (state, action: PayloadAction<GameJoinedEvent>) => {
      state.player = action.payload.player;
    },
  }
});

const { actions, reducer } = gameSlice;

export default reducer;

export const subscribe = (dispatch: AppDispatch, socket: SocketIOClient.Socket) => {
  socket.on('connectedToGame', (event: GameJoinedEvent) => {
    console.log('connectedToGame:', event);
    dispatch(actions.setGamePlayer(event));
  });

  socket.on('gameUpdated', (event: GameUpdatedEvent) => {
    console.log('gameUpdated:', event);
    dispatch(actions.updateGame(event));
  });
};

export const createGame = (
  { name }: CreateGameParams,
)=> async (dispatch: AppDispatch) => {
  const { data: { code } } = await axios.post(`${ENDPOINT}/games`);
  dispatch(joinGame({ code, name }));
};

export const joinGame = (
  { code, name }: JoinGameParams,
)=> async (dispatch: AppDispatch) => {
  dispatch(actions.setPlayerName(name));
  dispatch(actions.setCode(code));
  history.push(`/game/${code}`);
};

export const connectToGameChannel = () => async (
  _dispatch: AppDispatch,
  getState: AppGetState,
) => {
  const { game: { config: { name, code } } } = getState();
  const socket = await socketDeferred.promise;
  socket.emit('joinGame', { name, code });
}

export { selectors };
