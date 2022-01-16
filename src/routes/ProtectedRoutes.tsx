import AuthGuard from 'utils/auth/AuthGuard';
import DashboardLayout from 'components/layouts/DashboardLayout';

const ProtectedRoutes = {
  path: 'dashboard',
  element: (
    <AuthGuard>
      <DashboardLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '',
      element: null,
    },
    {
      path: 'portfolio',
      element: null,
    },
    {
      path: 'sample-page',
      element: null,
    },
    {
      path: 'settings/account',
      element: null,
    },
  ],
};

export default ProtectedRoutes;
