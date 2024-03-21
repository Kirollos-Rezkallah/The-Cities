import { Navigate } from 'react-router-dom';

// Define the type for props of the PrivateRoute component
type PrivateRouteProps = {
  children: JSX.Element; // JSX element as a child component
};

// Define the PrivateRoute component
function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  // Check if the user has access (dummy implementation)
  const hasAccess = true;

  // Render the children JSX element if the user has access, otherwise redirect to '/login'
  return hasAccess ? children : <Navigate to={'/login'} />;
}

export default PrivateRoute;
