import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { registrationAPI, RegistrationType } from '../../api/registration/registration';
import { AppThunk } from '../store';

import { setIsLoggedIn } from './authReducer';

const initialState = {
  isRegistrationIn: false,
};

const signUpSlice = createSlice({
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
  dispatch => {
    registrationAPI.createRegistration(registrationParams).then(res => {
      if (res.data.addedUser) {
        dispatch(setRegistration({ value: true }));
        dispatch(setIsLoggedIn({ value: true }));
      } else if (res.data.error) {
        // dispatch(setAppErrorAC(res.data.error))
      }
    });
  };
