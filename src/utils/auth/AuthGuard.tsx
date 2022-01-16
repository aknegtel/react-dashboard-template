import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from 'hooks/useAuth';

const AuthGuard = ({ children }: { children: ReactElement | null }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default AuthGuard;
