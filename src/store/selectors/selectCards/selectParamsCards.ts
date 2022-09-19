import { RootState } from '../../store';

export const selectCardsPack_id = (state: RootState): string =>
  state.cardsParams.cardsPack_id;
export const selectCardsCurrentPageCount = (state: RootState): number | undefined =>
  state.cardsParams.page;
export const selectCardsPageSizeCount = (state: RootState): number | undefined =>
  state.cardsParams.pageCount;
export const selectSortCards = (state: RootState): string => state.cardsParams.sortCards;
