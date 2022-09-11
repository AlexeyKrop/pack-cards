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
    return instance.post<AxiosResponse<UserType>>(`/auth/me`);
  },
  update() {
    return instance.post<UpdateUserType, AxiosResponse<UserType>>(`/auth/me`);
  },
};
// TYPE
export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
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
export type UpdateUserType = {
  name: string;
  avatar: string; // url or base64
};
