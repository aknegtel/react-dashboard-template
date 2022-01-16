import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

import { UserProfile, UserResponse } from 'types/auth';
import type { RootState } from 'app/store';
import { apiSlice } from 'features/api/apiSlice';

export type JWTContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, passwordConfirm: string, acceptsTerms: boolean) => Promise<void>;
  forgotPassword: (email: string) => void;
  resetPassword: (password: string, passwordConfirm: string) => void;
  updateProfile: VoidFunction;
};
// Define a type for the slice state
interface AuthState {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user: UserProfile | null;
  token: string | null;
}

// Define initial state using that type
export const initialState: AuthState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  token: null,
};

const setSession = (token?: string | null) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

// Change these reducers to use RTK Query
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.isInitialized = true;
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;

      setSession(null);
    });
    builder.addMatcher(apiSlice.endpoints.getMe.matchFulfilled, (state, action: PayloadAction<Pick<UserResponse, 'status' | 'result'>>) => {
      state.isInitialized = true;
      state.isLoggedIn = true;
      state.user = action.payload.result.user;
    });
    builder.addMatcher(apiSlice.endpoints.login.matchFulfilled, (state, action: PayloadAction<UserResponse>) => {
      state.isLoggedIn = true;
      state.isInitialized = true;
      state.user = action.payload.result.user;
      state.token = action.payload.token;

      setSession(action.payload.token);
    });
    builder.addMatcher(apiSlice.endpoints.register.matchFulfilled, (state, action: PayloadAction<UserResponse>) => {
      state.isLoggedIn = true;
      state.isInitialized = true;
      state.user = action.payload.result.user;
      state.token = action.payload.token;

      setSession(action.payload.token);
    });
    builder.addMatcher(apiSlice.endpoints.logout.matchFulfilled, (state) => {
      state.isInitialized = true;
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;

      setSession(null);
    });
    builder.addMatcher(
      apiSlice.endpoints.updateMe.matchFulfilled,
      (state, action: PayloadAction<Pick<UserResponse, 'status' | 'result'>>) => {
        state.user = action.payload.result.user;
      },
    );
    builder.addMatcher(apiSlice.endpoints.updatePassword.matchFulfilled, (state, action: PayloadAction<UserResponse>) => {
      state.isLoggedIn = true;
      state.isInitialized = true;
      state.user = action.payload.result.user;
      state.token = action.payload.token;

      setSession(action.payload.token);
    });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const selectUser = (state: RootState) => state.auth.user;

export const isUserLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const isUserInitialized = (state: RootState) => state.auth.isInitialized;

export default authSlice.reducer;
