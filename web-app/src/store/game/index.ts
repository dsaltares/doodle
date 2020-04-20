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
  startingGame: false,
  choosingConcept: undefined,
  submittedEntry: false,
  acknowledgedWinner: false,
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
    setGamePlayer: (state, action: PayloadAction<GameJoinedEvent>) => {
      state.player = action.payload.player;
    },
    startGame: (state) => {
      state.startingGame = true;
    },
    chooseConcept: (state, action: PayloadAction<string>) => {
      state.choosingConcept = action.payload;
    },
    submitEntry: (state) => {
      state.submittedEntry = true;
    },
    chooseEntry: (state, action: PayloadAction<string>) => {
      state.chosenEntry = action.payload;
    },
    acknowledgeWinner: (state) => {
      state.acknowledgedWinner = true;
    },
    updateGame: (state, action: PayloadAction<GameUpdatedEvent>) => {
      if (state.gameState && state.gameState.lastUpdate > action.payload.gameState.lastUpdate) {
        return state;
      }
      state.gameState = action.payload.gameState;

      if (action.payload.updateBy === state.player) {
        state.startingGame = false;
        state.choosingConcept = undefined;
        state.submittedEntry = false;
        state.chosenEntry = undefined;
        state.acknowledgedWinner = false;
      }
    },
  },
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
};

export const startGame = () => async (
  dispatch: AppDispatch,
) => {
  dispatch(actions.startGame());
  const socket = await socketDeferred.promise;
  socket.emit('startGame', {});
};

export const chooseConcept = (concept: string) => async (
  dispatch: AppDispatch,
) => {
  dispatch(actions.chooseConcept(concept));
  const socket = await socketDeferred.promise;
  socket.emit('chooseConcept', { concept });
};

export const submitDrawing = (drawing: string) => async (
  dispatch: AppDispatch,
) => {
  dispatch(actions.submitEntry());
  const socket = await socketDeferred.promise;
  socket.emit('submitEntry', {
    entry: { type: 'drawing', drawing }
  });
};

export const submitConcept = (concept: string) => async (
  dispatch: AppDispatch,
) => {
  dispatch(actions.submitEntry());
  const socket = await socketDeferred.promise;
  socket.emit('submitEntry', {
    entry: { type: 'concept', concept }
  });
};

export const chooseEntry = (targetPlayer: string) => async(
  dispatch: AppDispatch,
) => {
  dispatch(actions.chooseEntry(targetPlayer));
  const socket = await socketDeferred.promise;
  socket.emit('chooseEntry', { targetPlayer });
};

export const acknowledgeWinner = () => async(
  dispatch: AppDispatch,
) => {
  dispatch(actions.acknowledgeWinner());
  const socket = await socketDeferred.promise;
  socket.emit('acknowledgeWinner', {});
};

export { selectors };
