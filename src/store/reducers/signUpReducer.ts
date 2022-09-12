import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { registrationAPI, RegistrationType } from '../../api/registration/registration';
import { AppThunk } from '../store';

const initialState = {
  isRegistrationIn: false,
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setRegistration: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isRegistrationIn = action.payload.value;
    },
  },
});
export const signUpReducer = signUpSlice.reducer;
export const { setRegistration } = signUpSlice.actions;

// THUNK

export const setRegistrationTC =
  (registrationParams: RegistrationType): AppThunk =>
  () => {
    registrationAPI.createRegistration(registrationParams).then(res => console.log(res));
  };
