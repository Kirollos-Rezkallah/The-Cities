import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../types/browserHistory';
import { Middleware } from 'redux';
import { REDIRECT_TO_ROUTE_TYPE } from '../action';
import { reducer } from '../reducer';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === REDIRECT_TO_ROUTE_TYPE) {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
