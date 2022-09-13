import { AxiosResponse } from 'axios';

import { instance } from '../config';

export const authAPI = {
  login(loginParams: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<UserType>>(
      `auth/login`,
      loginParams,
    );
  },
  logout() {
    return instance.delete<AxiosResponse<LogOutResponseType>>(`auth/me`);
  },
  me() {
    return instance.post<UserType>(`/auth/me`);
  },
  update(name: string, avatar?: string) {
    return instance.put<UpdateUserParamsType, AxiosResponse<UpdateUserResponseType>>(
      `/auth/me`,
      {
        name,
        avatar,
      },
    );
  },
  forgotPassword(email: string, message: string, from?: string) {
    return instance.post<ResetPasswordParamsType, AxiosResponse<ForgotPasswordResponse>>(
      `/auth/forgot`,
      { email, message, from },
    );
  },
  createNewPassword(password: string, resetPasswordToken: string) {
    return instance.post<
      createNewPasswordParamsType,
      AxiosResponse<createNewPasswordResponseType>
    >(`/auth/set-new-password`, { password, resetPasswordToken });
  },
};
// TYPE
export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe?: boolean;
};
export type UserType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
};
export type LogOutResponseType = {
  info: string;
  error: string;
};
export type UpdateUserParamsType = {
  name: string;
  avatar: string; // url or base64
};
export type UpdateUserResponseType = {
  updatedUser: UserType;
  error?: string;
};
export type ForgotPasswordResponse = {
  info: string;
  error: string;
};

export type ResetPasswordParamsType = {
  email: string;
  from?: string;
  message?: string;
};
export type createNewPasswordParamsType = {
  password: string;
  resetPasswordToken: string;
};
export type createNewPasswordResponseType = {
  info: string;
  error: string;
};
