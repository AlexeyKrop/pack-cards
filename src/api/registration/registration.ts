import { AxiosResponse } from 'axios';

import { instance } from '../config';

export const registrationAPI = {
  createRegistration(registrationParams: RegistrationType) {
    return instance.post<RegistrationType, AxiosResponse<ResponseRegistrationType>>(
      `/auth/register`,
      registrationParams,
    );
  },
  recoveryPassword(forgotPassword: ForgotPasswordType) {
    return instance.post<ForgotPasswordType, AxiosResponse<ResetPasswordResponseType>>(
      `/auth/forgot`,
      forgotPassword,
    );
  },
  generateNewPassword(newPasswordParams: NewPasswordParamsType) {
    return instance.post<NewPasswordParamsType, AxiosResponse<ResetPasswordResponseType>>(
      '/auth/set-new-password',
      newPasswordParams,
    );
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
export type ForgotPasswordType = {
  email: string;
  from: string;
  message: string;
};
export type NewPasswordParamsType = {
  password: string;
  resetPasswordToken: string;
};
export type ResetPasswordResponseType = {
  info: string;

  error: string;
};
