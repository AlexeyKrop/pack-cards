import { ErrorType } from '../../reducers/appReducer';
import { RootState } from '../../store';

export const selectError = (state: RootState): ErrorType => state.app.error;
