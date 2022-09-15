import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { packsAPI, PackType } from '../../api/packs/packs';
import { AppThunk } from '../store';

const initialState = {
  cardPacks: [] as PackType[],
  page: 1,
  pageCount: 4,
  cardPacksTotalCount: 3729,
  minCardsCount: 0,
  maxCardsCount: 110,
  token: '2575f4e0-340d-11ed-ad48-2f28b3036009',
  tokenDeathTime: 1663751458606,
};
const packsSlice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setCardsPack: (state, action: PayloadAction<{ cardPacks: PackType[] }>) => {
      state.cardPacks = action.payload.cardPacks;
    },
  },
});

export const packsReducer = packsSlice.reducer;
export const { setCardsPack } = packsSlice.actions;

export const setCardsPackTC = (): AppThunk => (dispatch, getState) => {
  const { cardPacksTotalCount } = getState().packs;

  console.log(cardPacksTotalCount);
  packsAPI
    .setCardsPack()
    .then(res => dispatch(setCardsPack({ cardPacks: res.data.cardPacks })));
};
