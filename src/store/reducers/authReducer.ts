import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { authAPI, LoginParamsType } from '../../api/auth/auth';
import { AppThunk } from '../store';

import { setAppError, setAppStatus } from './appReducer';
import { setUserProfile } from './profileReducer';

const initialState = {
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ login: boolean }>) => {
      state.isLoggedIn = action.payload.login;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setIsLoggedIn } = authSlice.actions;

// THUNK

export const loginTC =
  (loginParams: LoginParamsType): AppThunk =>
  dispatch => {
    dispatch(setAppStatus({ status: 'loading' }));
    authAPI
      .login(loginParams)
      .then(res => {
        dispatch(setUserProfile({ user: res.data }));
        dispatch(setIsLoggedIn({ login: true }));
      })
      .catch((err: AxiosError<{ error: string }>) =>
        dispatch(setAppError({ error: err.response?.data.error })),
      )
      .finally(() => dispatch(setAppStatus({ status: 'success' })));
  };
export const logoutTC = (): AppThunk => dispatch => {
  dispatch(setAppStatus({ status: 'loading' }));
  authAPI
    .logout()
    .then(() => {
      dispatch(setIsLoggedIn({ login: false }));
      dispatch(setAppStatus({ status: 'success' }));
    })
    .catch((err: AxiosError<{ error: string }>) => {
      dispatch(setAppError({ error: err.message }));
    });
};
