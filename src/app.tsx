import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from './components/mainScreen';
import LoginScreen from './components/login';
import FavoutitesScreen from './components/favScreen';
import OfferScreen from './components/offer';
import ErrorScreen from './components/Routes/error';
import PrivateRoute from './components/Routes/privRoute';
import LoadingScreen from './components/loadingScreen';
import { Review } from './types/review';
import { useAppSelector } from './hooks';

type AppComponentProps = {
  reviews: Review[];
};

function App({ reviews }: AppComponentProps): JSX.Element | null {
  const isOffersDataLoading = useAppSelector(
    (state) => state.isOffersDataLoading
  );

  if (isOffersDataLoading) {
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
            <PrivateRoute>
              <FavoutitesScreen />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/offer/:id" element={<OfferScreen reviews={reviews} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
