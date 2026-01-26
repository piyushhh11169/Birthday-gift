import React from 'react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { store } from './redux/store';

/**
 * App Component - Root of the application
 * Wraps all routes with Redux Provider
 * Uses Outlet to render child routes
 */
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
};

export default App;