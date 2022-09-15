import { RootState } from '../store';

export const selectIsCreateNewPassword = (state: RootState): boolean =>
  state.createNewPassword.isCreateNewPassword;
