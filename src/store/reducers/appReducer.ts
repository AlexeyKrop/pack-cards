import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { authAPI, UserType } from '../../api/auth/auth';
import { AppThunk } from '../store';

import { setIsLoggedIn } from './authReducer';
import { setUserProfile } from './profileReducer';

export type RequestStatusType = 'idle' | 'loading' | 'success' | 'error';
export type ErrorType = string | null | undefined;
const initialState = {
  status: 'idle' as RequestStatusType,
  initialized: false,
  error: null as ErrorType,
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppInitial: (state, action: PayloadAction<{ initialized: boolean }>) => {
      state.initialized = action.payload.initialized;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: ErrorType }>) => {
      state.error = action.payload.error;
    },
  },
});

export const appReducer = appSlice.reducer;
export const { setAppInitial, setAppStatus, setAppError } = appSlice.actions;

// THUNK

export const appInitializedTC = (): AppThunk => dispatch => {
  // dispatch(setAppStatus({ status: 'loading' }));
  authAPI
    .me()
    .then(res => {
      dispatch(setUserProfile({ user: res.data }));
      dispatch(setIsLoggedIn({ login: true }));
      dispatch(setAppStatus({ status: 'success' }));
    })
    .catch((err: AxiosError<UserType>) => {
      dispatch(setAppStatus({ status: 'error' }));
      dispatch(setAppError({ error: err.response?.data.error }));
    })
    .finally(() => {
      dispatch(setAppInitial({ initialized: true }));
    });
};
