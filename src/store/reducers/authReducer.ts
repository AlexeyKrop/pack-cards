import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI, LoginParamsType } from '../../api/auth/auth';
import { AppThunk } from '../store';

import { setUserProfile } from './profileReducer';

const initialState = {
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isLoggedIn = action.payload.value;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setIsLoggedIn } = authSlice.actions;

// THUNK

export const loginTC =
  (loginParams: LoginParamsType): AppThunk =>
  dispatch => {
    authAPI.login(loginParams).then(res => {
      dispatch(setUserProfile({ user: res.data }));
      dispatch(setIsLoggedIn({ value: true }));
    });
  };
