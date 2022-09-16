import { RequestStatusType } from '../reducers/appReducer';
import { RootState } from '../store';

export const selectPacksStatus = (state: RootState): RequestStatusType =>
  state.packs.packStatus;
