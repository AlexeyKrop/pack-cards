import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { cardsAPI, CardType } from '../../api/cards/cards';
import { AppThunk } from '../store';

import { RequestStatusType } from './appReducer';

const initialState = {
  cards: [] as CardType[],
  cardsTotalCount: 3,
  cardsStatus: 'idle' as RequestStatusType,
};
const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardsCard: (state, action: PayloadAction<{ cards: CardType[] }>) => {
      state.cards = action.payload.cards;
    },
    setCardPacksTotalCount: (
      state,
      action: PayloadAction<{ cardsTotalCount: number }>,
    ) => {
      state.cardsTotalCount = action.payload.cardsTotalCount;
    },
    setPackStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.cardsStatus = action.payload.status;
    },
  },
});

export const cardsReducer = cardsSlice.reducer;
export const { setCardsCard, setCardPacksTotalCount, setPackStatus } = cardsSlice.actions;

// THUNK
export const setCardsCardTC =
  (id: string): AppThunk =>
  dispatch => {
    const params = {};

    cardsAPI.setCardsCard({ ...params, cardsPack_id: id }).then(res => {
      console.log(res.data.cards);
      dispatch(setCardsCard({ cards: res.data.cards }));
    });
  };
