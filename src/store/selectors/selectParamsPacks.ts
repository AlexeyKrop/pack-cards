import { RootState } from '../store';

export const selectCardsPacksTotalCount = (state: RootState): number =>
  state.packs.cardPacksTotalCount;
export const selectPageCount = (state: RootState): number => state.packs.pageCount;
export const selectCurrentPageCount = (state: RootState): number => state.packs.page;
