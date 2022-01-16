import { Outlet } from 'react-router-dom';

import GuestGuard from 'utils/auth/GuestGuard';

import MainPage from 'pages';

const PublicRoutes = {
  path: '',
  element: (
    <GuestGuard>
      <Outlet />
    </GuestGuard>
  ),
  children: [
    {
      path: '',
      element: <MainPage />,
    },
  ],
};

export default PublicRoutes;
