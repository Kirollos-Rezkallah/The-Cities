import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/components/mainScreen'; // Changed MainScreen to Home
import LoginPage from '../src/components/login'; // Changed LoginScreen to LoginPage
import FavoritesPage from '../src/components/favScreen'; // Changed FavoutitesScreen to FavoritesPage
import OfferPage from '../src/components/offer'; // Changed OfferScreen to OfferPage
import ErrorPage from '../src/components/Routes/error'; // Changed ErrorScreen to ErrorPage
import ProtectedRoute from '../src/components/Routes/privRoute'; // Changed PrivateRoute to ProtectedRoute

type AppProps = {
  placesCount: number;
};

function App({ placesCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />{' '}
        {/* Display ErrorPage for undefined routes */}
        <Route path="/" element={<Home placesCount={placesCount} />} />{' '}
        {/* Display Home for root path */}
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />{' '}
        {/* Display LoginPage for /login path */}
        <Route path="/offer/:id" element={<OfferPage />} />{' '}
        {/* Display OfferPage with dynamic id */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
