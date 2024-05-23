import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { redirect } from './middlewares/redirect';
import { createAPI } from '../Services/api';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
