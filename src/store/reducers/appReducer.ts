import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI } from '../../api/auth/auth';
import { AppThunk } from '../store';

import { setIsLoggedIn } from './authReducer';
import { setUserProfile } from './profileReducer';

const initialState = {
  initialized: false,
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppInitial: (state, action: PayloadAction<{ value: boolean }>) => {
      state.initialized = action.payload.value;
    },
  },
});

export const appReducer = appSlice.reducer;
export const { setAppInitial } = appSlice.actions;

// THUNK

export const appInitializedTC = (): AppThunk => dispatch => {
  authAPI.me().then(res => {
    dispatch(setUserProfile({ user: res.data }));
    dispatch(setIsLoggedIn({ value: true }));
  });
};
