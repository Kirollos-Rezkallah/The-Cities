import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from './components/mainScreen';
import LoginScreen from './components/login';
import FavoutitesScreen from './components/favScreen';
import OfferScreen from './components/offer';
import ErrorScreen from './components/Routes/error';
import PrivateRoute from './components/Routes/privRoute';
import { Offer } from './types/offer';
import { Review } from './types/review';
import { useAppDispatch, useAppSelector } from './hooks';
import { setOffersList } from './TheStore/action';

type AppComponentProps = {
  reviews: Review[];
};

function App({ reviews }: AppComponentProps): JSX.Element | null {
  const offers: Offer[] = useAppSelector((state) => state.offersList);
  const dispatch = useAppDispatch();
  dispatch(setOffersList());

  const favourites = offers.filter((o) => o.isFavorite);
  if (offers.length === 0) {
    return null;
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
              <FavoutitesScreen favourites={favourites} />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/offer/:id"
          element={<OfferScreen reviews={reviews} offers={offers} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
