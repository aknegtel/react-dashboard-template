import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import Loadable from 'components/Loadable';
import GuestGuard from 'utils/auth/GuestGuard';

const LoginPage = Loadable(lazy(() => import('pages/auth/Login')));

const AuthRoutes = {
  path: 'auth',
  element: (
    <GuestGuard>
      <Outlet />
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: <LoginPage />,
    },
  ],
};

export default AuthRoutes;
