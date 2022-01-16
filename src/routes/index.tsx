import { useRoutes } from 'react-router-dom';

import AuthRoutes from './AuthRoutes';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';

import Error404 from 'pages/404';

export default function Routes() {
  return useRoutes([
    AuthRoutes,
    ProtectedRoutes,
    PublicRoutes,
    {
      path: '*',
      element: <Error404 />,
      children: [],
    },
  ]);
}
