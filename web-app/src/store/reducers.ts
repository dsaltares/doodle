import { combineReducers } from '@reduxjs/toolkit';
import socket from './socket';
import game from './game';

const rootReducer = combineReducers({
  socket,
  game,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
