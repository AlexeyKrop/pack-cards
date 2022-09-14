import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI, UserType } from '../../api/auth/auth';
import { AppThunk } from '../store';

const initialState = {
  user: {
    name: '',
  } as UserType,
  isDisabled: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<{ user: UserType }>) => {
      state.user = action.payload.user;
    },
    setDisabled: (state, action: PayloadAction<{ isDisabled: boolean }>) => {
      state.isDisabled = action.payload.isDisabled;
    },
  },
});

export const profileReducer = profileSlice.reducer;
export const { setUserProfile, setDisabled } = profileSlice.actions;

export const updateUserProfileTC =
  (name: string): AppThunk =>
  dispatch => {
    dispatch(setDisabled({ isDisabled: true }));
    authAPI.updateName(name).then(res => {
      dispatch(setDisabled({ isDisabled: false }));
      dispatch(setUserProfile({ user: res.data.updatedUser }));
    });
  };
