import { RootState } from '../store';

export const selectCardsPacksTotalCount = (state: RootState): number =>
  state.packs.cardPacksTotalCount;
export const selectPageSizeCount = (state: RootState): number | undefined =>
  state.packsParams.pageCount;
export const selectCurrentPageCount = (state: RootState): number | undefined =>
  state.packsParams.page;
export const selectSetFilterForPackName = (state: RootState): string =>
  state.packsParams.packName;
