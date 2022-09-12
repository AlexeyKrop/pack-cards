import {
  configureStore,
  combineReducers,
  AnyAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import { appReducer } from './reducers/appReducer';
import { authReducer } from './reducers/authReducer';
import { profileReducer } from './reducers/profileReducer';
import { signUpReducer } from './reducers/signUpReducer';

const rootReducer = combineReducers({
  registration: signUpReducer,
  auth: authReducer,
  app: appReducer,
  profile: profileReducer,
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
