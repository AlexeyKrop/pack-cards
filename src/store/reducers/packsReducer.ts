import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { packsAPI, PackType } from '../../api/packs/packs';
import { AppThunk } from '../store';

const initialState = {
  cardPacks: [] as PackType[],
  cardPacksTotalCount: 3729,
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
  const { page, pageCount } = getState().packsParams;
  const params = { page, pageCount };

  packsAPI.setCardsPack(params).then(res => {
    dispatch(setCardsPack({ cardPacks: res.data.cardPacks }));
    // dispatch(setChangePage({ page: res.data.page }));
    // dispatch(setChangePageCount({ pageCount: res.data.pageCount }));
  });
};
