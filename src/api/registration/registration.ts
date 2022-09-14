import { AxiosResponse } from 'axios';

import { instance } from '../config';

export const registrationAPI = {
  createRegistration(registrationParams: RegistrationType) {
    return instance.post<RegistrationType, AxiosResponse<ResponseRegistrationType>>(
      `/auth/register`,
      registrationParams,
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
export type RegistrationType = {
  email: string;
  password: string;
};
export type ResponseRegistrationType = {
  addedUser: {};
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
