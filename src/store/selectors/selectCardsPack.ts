import { PackType } from '../../api/packs/packs';
import { RootState } from '../store';

export const selectCardsPack = (state: RootState): PackType[] => state.packs.cardPacks;
