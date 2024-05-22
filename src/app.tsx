import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainScreen from './components/mainScreen';
import LoginScreen from './components/login';
import FavoutitesScreen from './components/favScreen';
import OfferScreen from './components/offer';
import ErrorScreen from './components/Routes/error';
import PrivateRoute from './components/Routes/privRoute';
import LoadingScreen from './components/loadingScreen';
import { useAppSelector } from './hooks';
import { AuthorizationStatus } from './const';

function App(): JSX.Element | null {
  const authorizationStatus: AuthorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
  const isOffersDataLoading = useAppSelector(
    (state) => state.isOffersDataLoading
  );

  if (
    authorizationStatus === AuthorizationStatus.Unknown ||
    isOffersDataLoading
  ) {
    return <LoadingScreen />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorScreen />} />
        <Route path="/" element={<MainScreen />} />
        <Route
          path="/favourites"
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoutitesScreen />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/offer/:id" element={<OfferScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
