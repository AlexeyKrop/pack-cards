import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { packsAPI, PackType } from '../../api/packs/packs';
import { AppThunk } from '../store';

const initialState = {
  cardPacks: [] as PackType[],
  cardPacksTotalCount: 3729,
};
const packsSlice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setCardsPack: (state, action: PayloadAction<{ cardPacks: PackType[] }>) => {
      state.cardPacks = action.payload.cardPacks;
    },
    setCardPacksTotalCount: (
      state,
      action: PayloadAction<{ cardPacksTotalCount: number }>,
    ) => {
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount;
    },
  },
});

export const packsReducer = packsSlice.reducer;
export const { setCardsPack, setCardPacksTotalCount } = packsSlice.actions;

export const setCardsPackTC = (): AppThunk => (dispatch, getState) => {
  const { page, pageCount, packName } = getState().packsParams;
  const params = { page, pageCount, packName };

  packsAPI.setCardsPack(params).then(res => {
    dispatch(setCardsPack({ cardPacks: res.data.cardPacks }));
    dispatch(
      setCardPacksTotalCount({ cardPacksTotalCount: res.data.cardPacksTotalCount }),
    );
  });
};
