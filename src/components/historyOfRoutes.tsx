// Import useState and useLayoutEffect hooks from React
import { useState, useLayoutEffect } from 'react';
// Import Router from react-router-dom for navigation
import { Router } from 'react-router-dom';
// Import type for BrowserHistory from 'history' library
import type { BrowserHistory } from 'history';

// Define the interface for HistoryRouter component props
export interface HistoryRouterProps {
  // BrowserHistory object for managing session history
  history: BrowserHistory;
  // Optional base URL for all locations
  basename?: string;
  // Optional child elements to be rendered inside the Router
  children?: React.ReactNode;
}

// Begin defining the HistoryRouter component
function HistoryRouter({ basename, children, history }: HistoryRouterProps) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default HistoryRouter;
