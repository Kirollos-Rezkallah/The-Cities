// Importing necessary modules and dependencies.
import { store } from '../TheStore'; // Importing the Redux store.
import { setError } from '../TheStore/action'; // Importing the setError action creator.
import { clearErrorAction } from '../TheStore/apiAction'; // Importing the clearErrorAction action creator.

// Function to process error handling by dispatching actions.
export const processErrorHandle = (message: string): void => {
  // Dispatching setError action with the error message.
  store.dispatch(setError(message));
  // Dispatching clearErrorAction to clear any previous error.
  store.dispatch(clearErrorAction());
};
