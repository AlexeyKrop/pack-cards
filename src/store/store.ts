import {
  configureStore,
  combineReducers,
  AnyAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import { appReducer } from './reducers/appReducer';
import { authReducer } from './reducers/authReducer';
import { createNewPasswordReducer } from './reducers/createNewPasswordReducer';
import { forgotPasswordReducer } from './reducers/forgotPasswordReducer';
import { packsReducer } from './reducers/packsReducer';
import { profileReducer } from './reducers/profileReducer';
import { signUpReducer } from './reducers/signUpReducer';

const rootReducer = combineReducers({
  registration: signUpReducer,
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  createNewPassword: createNewPasswordReducer,
  app: appReducer,
  profile: profileReducer,
  packs: packsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
