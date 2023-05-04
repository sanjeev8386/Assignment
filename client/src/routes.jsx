import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './layout/DashboardLayout';
import Login from './views/Login';
import Register from './views/Register';
import Assets from './views/Assets';
import NewAsset from './views/Assets/NewAsset';

export const LoggedInRouter = () =>
  useRoutes([
    {
      path: '*',
      element: <DashboardLayout />,
      children: [
        { path: "*", element: <Navigate to="assets" replace /> },
        { path: 'assets', element: <Assets /> },
        { path: 'assets/new', element: <NewAsset /> }
      ]
    }
  ]);

export const LoggedOutRouter = () =>
  useRoutes([
    {
      path: '/',
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '/', element: <Navigate to="/login" /> }
      ]
    },
    { path: '*', element: <Navigate to="/login" replace /> }
  ]);
