import { RootState } from '../../store';

export const selectAppInitialized = (state: RootState): boolean => state.app.initialized;
