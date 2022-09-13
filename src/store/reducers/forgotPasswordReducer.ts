import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI } from '../../api/auth/auth';
import { AppThunk } from '../store';

const initialState = {
  isSendEmail: false,
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    setIsSendEmail: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isSendEmail = action.payload.value;
    },
  },
});

export const forgotPasswordReducer = forgotPasswordSlice.reducer;
export const { setIsSendEmail } = forgotPasswordSlice.actions;

// THUNK

export const forgotPasswordTC =
  (email: string, message: string): AppThunk =>
  dispatch => {
    authAPI
      .forgotPassword(email, message)
      .then(() => dispatch(setIsSendEmail({ value: true })));
  };
