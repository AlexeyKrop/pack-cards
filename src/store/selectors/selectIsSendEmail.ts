import { RootState } from '../store';

export const selectIsSendEmail = (state: RootState): boolean =>
  state.forgotPassword.isSendEmail;
