import { RootState } from '../../store';

export const selectLoggedIn = (state: RootState): boolean => state.auth.isLoggedIn;
