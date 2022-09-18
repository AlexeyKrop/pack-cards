import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cardAnswer: '',
  cardQuestion: '',
  min: 1,
  max: 4,
  sortCards: '',
  page: 1,
  pageCount: 7,
};
const cardsParamsSlice = createSlice({
  name: 'cardsParams',
  initialState,
  reducers: {},
});

export const cardsParamsReducer = cardsParamsSlice.reducer;
