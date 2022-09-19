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
    setCardsCardTotalCount: (
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
export const { setCardsCard, setCardsCardTotalCount, setPackStatus } = cardsSlice.actions;

// THUNK
export const setCardsCardTC =
  (cardsPack_id: string): AppThunk =>
  (dispatch, getState) => {
    const { cardsParams } = getState();

    cardsAPI.setCardsCard({ ...cardsParams, cardsPack_id }).then(res => {
      dispatch(setCardsCard({ cards: res.data.cards }));
      dispatch(setCardsCardTotalCount({ cardsTotalCount: res.data.cardsTotalCount }));
    });
  };
