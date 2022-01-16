import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import config from 'config';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  UserResponse,
  LogoutResponse,
  SignupRequest,
  ResetPasswordRequest,
  UpdatePasswordRequest,
  UserProfile,
} from '../../types/auth';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token || window.localStorage.getItem('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query<Pick<UserResponse, 'status' | 'result'>, void>({
      query: () => '/users/me',
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.query<LogoutResponse, void>({
      query: () => '/auth/logout',
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (email) => ({
        url: '/auth/forgotPassword',
        method: 'POST',
        body: email,
      }),
    }),
    register: builder.mutation<UserResponse, SignupRequest>({
      query: (userInfo) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userInfo,
      }),
    }),
    resetPassword: builder.mutation<UserResponse, ResetPasswordRequest>({
      query: (passwords) => ({
        url: '/auth/passwordReset',
        method: 'PATCH',
        body: passwords,
      }),
    }),
    updateMe: builder.mutation<Pick<UserResponse, 'status' | 'result'>, Partial<UserProfile>>({
      query: (userInfo) => ({
        url: '/users/updateMe',
        method: 'PATCH',
        body: userInfo,
      }),
    }),
    updatePassword: builder.mutation<UserResponse, UpdatePasswordRequest>({
      query: (passwordInfo) => ({
        url: '/users/updateMyPassword',
        method: 'PATCH',
        body: passwordInfo,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useLogoutQuery,
  useForgotPasswordMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useUpdateMeMutation,
  useUpdatePasswordMutation,
} = apiSlice;
