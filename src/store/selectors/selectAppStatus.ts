import { RequestStatusType } from '../reducers/appReducer';
import { RootState } from '../store';

export const selectAppStatus = (state: RootState): RequestStatusType => state.app.status;
