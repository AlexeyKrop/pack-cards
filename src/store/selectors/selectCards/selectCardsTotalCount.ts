import { RootState } from '../../store';

export const selectCardsTotalCount = (state: RootState): number =>
  state.cards.cardsTotalCount;
