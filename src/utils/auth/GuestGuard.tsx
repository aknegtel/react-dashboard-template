import config from 'config';
import useAuth from 'hooks/useAuth';
import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GuestGuard = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(config.dashboard, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default GuestGuard;
