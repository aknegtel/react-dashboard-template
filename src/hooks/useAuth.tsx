import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectAuth } from 'features/auth/authSlice';
import { apiSlice } from 'features/api/apiSlice';

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (token && !auth.user) {
      dispatch(apiSlice.endpoints.getMe.initiate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...auth };
};

export default useAuth;
