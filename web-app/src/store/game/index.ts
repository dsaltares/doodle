import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';
import { AppDispatch, AppGetState } from '..';
import { socketDeferred } from '../socket';
import {
  GameSliceState,
  CreateGameParams,
  GameJoinedEvent,
  GameUpdatedEvent,
  JoinGameParams,
} from "./types";
import * as selectors from './selectors';

const initialState: GameSliceState = {
  config: {},
  startingGame: false,
  choosingConcept: undefined,
  submittedEntry: false,
  acknowledgedWinner: false,
  alerts: [],
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
    leaveGame: (state) => {
      state.config = {
        code: undefined,
        name: undefined,
      };
      state.player = undefined;
      state.gameState = undefined;
      state.startingGame = false;
      state.choosingConcept = undefined;
      state.submittedEntry = false;
      state.chosenEntry = undefined;
      state.acknowledgedWinner = false;
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
      if (action.payload.updateBy === state.player) {
        state.startingGame = false;
        state.choosingConcept = undefined;
        state.submittedEntry = false;
        state.chosenEntry = undefined;
        state.acknowledgedWinner = false;
      }

      if (action.payload.alert) {
        state.alerts.push(action.payload.alert);
      }

      if (state.gameState && state.gameState.lastUpdate > action.payload.gameState.lastUpdate) {
        return state;
      }
      state.gameState = action.payload.gameState;
    },
    dismissAlert: (state) => {
      if (state.alerts.length > 0) {
        state.alerts.shift();
      }
    }
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
  { name, goToGame }: CreateGameParams,
)=> async (dispatch: AppDispatch) => {
  const code = uuid();
  dispatch(joinGame({ code, name, goToGame }));
};

export const joinGame = (
  { code, name, goToGame }: JoinGameParams,
)=> async (dispatch: AppDispatch) => {
  dispatch(actions.setPlayerName(name));
  dispatch(actions.setCode(code));
  goToGame(code);
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

export const leaveGame = () => async (
  dispatch: AppDispatch,
) => {
  dispatch(actions.leaveGame());
  const socket = await socketDeferred.promise;
  socket.emit('leaveGame', {});
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

const { dismissAlert } = actions;
export { dismissAlert };

export { selectors };
