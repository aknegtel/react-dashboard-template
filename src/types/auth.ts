import { Status } from 'types/api';

export interface UserProfile {
  photo: string;
  role: string;
  passwordLastChange: Date;
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface UserResponse {
  status: Status;
  token: string;
  result: {
    user: UserProfile;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LogoutResponse {
  status: Status;
}

export interface ForgotPasswordResponse {
  status: Status;
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  acceptsTerms: boolean;
}

export interface ResetPasswordRequest {
  password: string;
  passwordConfirm: string;
}

export interface UpdatePasswordRequest {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}
