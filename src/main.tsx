import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import AuthLayout from './Components/AuthLayout';
import './index.css'
import MainPage from './pages/MainPage';
import Letter from './Components/Letter';
import Carousel from './Components/Carousel';

/**
 * Router Configuration
 * Uses createBrowserRouter for nested routing with layouts
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/auth',
        element: (
          <AuthLayout authentication={false}>
            <AuthPage />
          </AuthLayout>
        )
      },
      {
        path: '/',
        element: (
          <AuthLayout authentication={true}>
            <MainPage />
          </AuthLayout>
        )
      },
      {
        path: '/letter',
        element: (
          <AuthLayout authentication={false}>
            <Letter />
          </AuthLayout>
        )
      },
      {
        path: '/carousel',
        element: (
          <AuthLayout authentication={false}>
            <Carousel />
          </AuthLayout>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);