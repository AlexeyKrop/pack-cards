import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  cardsPack_id: '',
  cardAnswer: '',
  cardQuestion: '',
  min: 0,
  max: 5,
  sortCards: '',
  page: 1 as number | undefined,
  pageCount: 4 as number | undefined,
};
const cardsParamsSlice = createSlice({
  name: 'cardsParams',
  initialState,
  reducers: {
    setChangeCardId: (state, action: PayloadAction<{ cardsPack_id: string }>) => {
      state.cardsPack_id = action.payload.cardsPack_id;
    },
    setChangeCardsPage: (
      state,
      action: PayloadAction<{ currentPage: number | undefined }>,
    ) => {
      state.page = action.payload.currentPage;
    },
    setChangeCardsPageSize: (
      state,
      action: PayloadAction<{ pageCount: number | undefined }>,
    ) => {
      state.pageCount = action.payload.pageCount;
    },
    setSortCards: (state, action: PayloadAction<{ value: string }>) => {
      state.sortCards = `${action.payload.value}updated`;
    },
  },
});

export const cardsParamsReducer = cardsParamsSlice.reducer;
export const {
  setChangeCardsPage,
  setChangeCardId,
  setChangeCardsPageSize,
  setSortCards,
} = cardsParamsSlice.actions;
