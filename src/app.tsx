import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from './components/mainScreen';
import LoginScreen from './components/login';
import FavoutitesScreen from './components/favScreen';
import OfferScreen from './components/offer';
import ErrorScreen from './components/Routes/error';
import PrivateRoute from './components/Routes/privRoute';
import { Offer } from './types/offer';

type AppComponentProps = {
  placesCount: number;
  // reviews: Review[];
  offers: Offer[];
};

function App({ placesCount, offers }: AppComponentProps): JSX.Element {
  // Filter offers to get favourites
  const favourites = offers.filter((o) => o.isFavorite);
  return (
    // Set up routing using BrowserRouter and Routes
    <BrowserRouter>
      <Routes>
        {/* Route for handling unknown paths */}
        <Route path="*" element={<ErrorScreen />} />
        {/* Route for the main screen, passing placesCount and offers as props */}
        <Route
          path="/"
          element={<MainScreen placesCount={placesCount} offers={offers} />}
        />
        {/* Route for the favourites screen, wrapped in a PrivateRoute component */}
        <Route
          path="/favourites"
          element={
            <PrivateRoute>
              <FavoutitesScreen favourites={favourites} />
            </PrivateRoute>
          }
        />
        {/* Route for the login screen */}
        <Route path="/login" element={<LoginScreen />} />
        {/* Route for individual offer screens */}
        <Route path="/offer/:id" element={<OfferScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
