import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { registrationAPI } from '../../api/registration/registration';
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
    registrationAPI
      .forgotPassword(email, message)
      .then(() => dispatch(setIsSendEmail({ value: true })));
  };
