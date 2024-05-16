// Importing necessary modules and dependencies.
import { AxiosInstance } from 'axios'; // Importing AxiosInstance type from Axios.
import { createAsyncThunk } from '@reduxjs/toolkit'; // Importing createAsyncThunk from Redux Toolkit.
import { AppDispatch, State } from '../types/state.js'; // Importing AppDispatch and State types.
import { Offer } from '../types/offer.js'; // Importing Offer type.
import { loadOffers, setError, setOffersDataLoadingStatus } from './action'; // Importing action creators.
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const'; // Importing APIRoute and TIMEOUT_SHOW_ERROR constants.
import { store } from './'; // Importing the Redux store.

// Async thunk action to clear error after a timeout.
export const clearErrorAction = createAsyncThunk('clearError', () => {
  // Setting a timeout to dispatch setError action with null to clear the error.
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

// Async thunk action to fetch offers data.
export const fetchOffersAction = createAsyncThunk<
  void, // Payload type of the action.
  undefined, // Argument type of the action.
  {
    dispatch: AppDispatch; // Dispatch function type.
    state: State; // State type.
    extra: AxiosInstance; // Extra argument type (API instance).
  }
>('fetchQuestions', async (_arg, { dispatch, extra: api }) => {
  // Dispatching setOffersDataLoadingStatus action to indicate loading state.
  dispatch(setOffersDataLoadingStatus(true));
  // Making an API request to fetch offers data.
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  // Dispatching setOffersDataLoadingStatus action to indicate loading state is completed.
  dispatch(setOffersDataLoadingStatus(false));
  // Dispatching loadOffers action with the fetched data.
  dispatch(loadOffers(data));
});
