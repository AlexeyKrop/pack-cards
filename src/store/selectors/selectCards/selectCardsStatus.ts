import { RequestStatusType } from '../../reducers/appReducer';
import { RootState } from '../../store';

export const selectCardsStatus = (state: RootState): RequestStatusType =>
  state.cards.cardsStatus;
