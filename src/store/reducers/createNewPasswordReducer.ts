import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI } from '../../api/auth/auth';
import { AppThunk } from '../store';

const initialState = {
  isCreateNewPassword: false,
};
const createNewPasswordSlice = createSlice({
  name: 'createNewPassword',
  initialState,
  reducers: {
    setIsNewPassword: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isCreateNewPassword = action.payload.value;
    },
  },
});

export const createNewPasswordReducer = createNewPasswordSlice.reducer;
export const { setIsNewPassword } = createNewPasswordSlice.actions;

// THUNK

export const createNewPasswordTC =
  (password: string, resetPasswordToken: string): AppThunk =>
  dispatch => {
    authAPI.createNewPassword(password, resetPasswordToken).then(res => {
      console.log(res);
      dispatch(setIsNewPassword({ value: true }));
    });
  };
