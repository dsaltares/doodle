import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { AppDispatch, AppGetState } from '..';
import { socketDeferred } from '../socket';
import {
  GameSliceState,
  CreateGameParams,
  GameJoinedEvent,
  GameUpdatedEvent,
  JoinGameParams,
  Alert,
} from './types';
import * as selectors from './selectors';

const initialState: GameSliceState = {
  config: {},
  startingGame: false,
  choosingConcept: undefined,
  submittedEntry: false,
  acknowledgedWinner: false,
  alerts: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayerName: (state, action: PayloadAction<string>): void => {
      state.config.name = action.payload;
    },
    setCode: (state, action: PayloadAction<string>): void => {
      state.config.code = action.payload;
    },
    setGamePlayer: (state, action: PayloadAction<GameJoinedEvent>): void => {
      state.player = action.payload.player;
    },
    leaveGame: (state): void => {
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
      state.alerts = [];
    },
    startGame: (state): void => {
      state.startingGame = true;
    },
    chooseConcept: (state, action: PayloadAction<string>): void => {
      state.choosingConcept = action.payload;
    },
    submitEntry: (state): void => {
      state.submittedEntry = true;
    },
    chooseEntry: (state, action: PayloadAction<string>): void => {
      state.chosenEntry = action.payload;
    },
    acknowledgeWinner: (state): void => {
      state.acknowledgedWinner = true;
    },
    updateGame: (state, action: PayloadAction<GameUpdatedEvent>): void => {
      const {
        payload: { updateBy, gameState, alert },
      } = action;

      if (updateBy === state.player) {
        state.startingGame = false;
        state.choosingConcept = undefined;
        state.submittedEntry = false;
        state.chosenEntry = undefined;
        state.acknowledgedWinner = false;
      }

      const hasAlert = !!alert;
      const playerId = state.player as string;
      const forCurrentPlayer =
        !alert?.ignorePlayers || !alert.ignorePlayers.includes(playerId);

      if (hasAlert && forCurrentPlayer) {
        state.alerts.push(alert as Alert);
      }

      if (
        state.gameState &&
        state.gameState.lastUpdate > gameState.lastUpdate
      ) {
        return;
      }
      state.gameState = gameState;
    },
    dismissAlert: (state): void => {
      if (state.alerts.length > 0) {
        state.alerts.shift();
      }
    },
  },
});

const { actions, reducer } = gameSlice;

export default reducer;

export const subscribe = (
  dispatch: AppDispatch,
  socket: SocketIOClient.Socket
): void => {
  socket.on('connectedToGame', (event: GameJoinedEvent) => {
    console.log('connectedToGame:', event);
    dispatch(actions.setGamePlayer(event));
  });

  socket.on('gameUpdated', (event: GameUpdatedEvent) => {
    console.log('gameUpdated:', event);

    dispatch(actions.updateGame(event));
  });

  socket.on('gameDoesNotExist', () => {
    console.log('gameDoesNotExist');
    dispatch(actions.leaveGame());
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
    dispatch(actions.leaveGame());
  });
};

export const joinGame = ({ code, name, goToGame }: JoinGameParams) => async (
  dispatch: AppDispatch
): Promise<void> => {
  dispatch(actions.setPlayerName(name));
  dispatch(actions.setCode(code));
  goToGame(code);
};

export const createGame = ({ name, goToGame }: CreateGameParams) => async (
  dispatch: AppDispatch
): Promise<void> => {
  const code = uuid();
  dispatch(joinGame({ code, name, goToGame }));
};

export const connectToGameChannel = () => async (
  _dispatch: AppDispatch,
  getState: AppGetState
): Promise<void> => {
  const {
    game: {
      config: { name, code },
    },
  } = getState();
  const socket = await socketDeferred.promise;
  socket.emit('joinGame', { name, code });
};

export const startGame = () => async (dispatch: AppDispatch): Promise<void> => {
  dispatch(actions.startGame());
  const socket = await socketDeferred.promise;
  socket.emit('startGame', {});
};

export const leaveGame = () => async (dispatch: AppDispatch): Promise<void> => {
  dispatch(actions.leaveGame());
  const socket = await socketDeferred.promise;
  socket.emit('leaveGame', {});
};

export const chooseConcept = (concept: string) => async (
  dispatch: AppDispatch
): Promise<void> => {
  dispatch(actions.chooseConcept(concept));
  const socket = await socketDeferred.promise;
  socket.emit('chooseConcept', { concept });
};

export const submitDrawing = (drawing: string) => async (
  dispatch: AppDispatch
): Promise<void> => {
  dispatch(actions.submitEntry());
  const socket = await socketDeferred.promise;
  socket.emit('submitEntry', {
    entry: { type: 'drawing', drawing },
  });
};

export const submitConcept = (concept: string) => async (
  dispatch: AppDispatch
): Promise<void> => {
  dispatch(actions.submitEntry());
  const socket = await socketDeferred.promise;
  socket.emit('submitEntry', {
    entry: { type: 'concept', concept },
  });
};

export const chooseEntry = (targetPlayer: string) => async (
  dispatch: AppDispatch
): Promise<void> => {
  dispatch(actions.chooseEntry(targetPlayer));
  const socket = await socketDeferred.promise;
  socket.emit('chooseEntry', { targetPlayer });
};

export const acknowledgeWinner = () => async (
  dispatch: AppDispatch
): Promise<void> => {
  dispatch(actions.acknowledgeWinner());
  const socket = await socketDeferred.promise;
  socket.emit('acknowledgeWinner', {});
};

const { dismissAlert } = actions;
export { dismissAlert };

export { selectors };
