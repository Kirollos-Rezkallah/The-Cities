// Import necessary components and functions from react-router-dom for routing
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// Import various screen components
import MainScreen from './components/mainScreen';
import OfferScreen from './components/offer';
// Import authorization status constants
import { AuthorizationStatus } from './const';
// Import the Login screen component
import LoginScreen from './components/login';
// Import PrivateRoute component for protected routes
import PrivateRoute from './components/Routes/privRoute';
// Import the Favorites screen component
import FavoutitesScreen from './components/favScreen';
// Import the Loading screen component
import LoadingScreen from './components/loadingScreen';
// Import the Error screen component
import ErrorScreen from './components/Routes/error';
// Import custom hook for accessing the app's state
import { useAppSelector } from './hooks';
// Import the Review type definition
import { Review } from './types/review';

// Define the props type for the AppComponent
type AppComponentProps = {
  // Array of reviews to be passed as a prop
  reviews: Review[];
};

function App({ reviews }: AppComponentProps): JSX.Element | null {
  const authorizationStatus = useAppSelector(
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
        <Route path="/offer/:id" element={<OfferScreen reviews={reviews} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
