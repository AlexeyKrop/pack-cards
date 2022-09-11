import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type RootStateType = ReturnType<typeof store.getState>;
