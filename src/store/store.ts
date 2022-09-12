import {
  configureStore,
  combineReducers,
  AnyAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import { signUpReducer } from './reducers/signUpReducer';

const rootReducer = combineReducers({
  registration: signUpReducer,
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
