import { UserType } from '../../../api/auth/auth';
import { RootState } from '../../store';

export const selectUser = (state: RootState): UserType => state.profile.user;
