import {
  checkAuthAction,
  fetchOffersAction,
  getHasError,
  getIsOffersLoading,
  store,
} from '../TheStore';
import { useAppSelector } from '../hooks';
import LoadingScreen from '../components/loadingScreen';
import ErrorScreen from '../components/error';
import AppRoutes from '../components/appRoutes';

import { useFetchFavorites } from './hooks';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector(getIsOffersLoading);
  const hasError = useAppSelector(getHasError);

  useFetchFavorites();

  if (isOffersDataLoading) {
    return <LoadingScreen />;
  }

  if (hasError) {
    return <ErrorScreen />;
  }

  return <AppRoutes />;
}

export default App;
