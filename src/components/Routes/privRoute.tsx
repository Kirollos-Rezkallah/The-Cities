import { Navigate } from 'react-router-dom';

// Define the type for props expected by the PrivateRoute component
type PrivateRouteProps = {
  children: JSX.Element; // JSX element to be rendered as children of PrivateRoute
};

// PrivateRoute component renders its children if user has access, otherwise redirects to login page
function PrivRoute({ children }: PrivateRouteProps): JSX.Element {
  const hasAccess = false; // Variable to indicate whether user has access, set to false by default

  // Return either the children or a redirect to login page based on access status
  return hasAccess ? children : <Navigate to={'/login'} />;
}

export default PrivRoute; // Export the PrivateRoute component for use in other files
