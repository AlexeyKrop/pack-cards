import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI, UserType } from '../../api/auth/auth';
import { AppThunk } from '../store';

const initialState = {
  user: {
    name: '',
  } as UserType,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<{ user: UserType }>) => {
      state.user = action.payload.user;
    },
  },
});

export const profileReducer = profileSlice.reducer;
export const { setUserProfile } = profileSlice.actions;

export const updateUserProfileTC =
  (name: string): AppThunk =>
  dispatch => {
    authAPI
      .update(name)
      .then(res => dispatch(setUserProfile({ user: res.data.updatedUser })));
  };
