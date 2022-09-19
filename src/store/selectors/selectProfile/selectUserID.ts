import { RootState } from '../../store';

export const selectUserID = (state: RootState): string => state.packsParams.user_id;
