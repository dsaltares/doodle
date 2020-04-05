import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: state => state,
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
