import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserType } from '../../api/auth/auth';

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
