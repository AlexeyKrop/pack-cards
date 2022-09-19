import { RootState } from '../../store';

export const selectCardsPack_id = (state: RootState): string =>
  state.cardsParams.cardsPack_id;
