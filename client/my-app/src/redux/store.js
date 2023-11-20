import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './Reducers/index';
export const store = configureStore({
  reducer: rootReducer
});

export default store;
