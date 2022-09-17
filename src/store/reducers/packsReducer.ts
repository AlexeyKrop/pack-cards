import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { packsAPI, PackType } from '../../api/packs/packs';
import { AppThunk } from '../store';

import { RequestStatusType, setAppError } from './appReducer';

const initialState = {
  cardPacks: [] as PackType[],
  cardPacksTotalCount: 3729,
  packStatus: 'idle' as RequestStatusType,
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
    setPackStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.packStatus = action.payload.status;
    },
  },
});

export const packsReducer = packsSlice.reducer;
export const { setCardsPack, setCardPacksTotalCount, setPackStatus } = packsSlice.actions;

export const setCardsPackTC = (): AppThunk => (dispatch, getState) => {
  const params = getState().packsParams;

  dispatch(setPackStatus({ status: 'loading' }));
  packsAPI
    .setCardsPack(params)
    .then(res => {
      dispatch(setCardsPack({ cardPacks: res.data.cardPacks }));
      dispatch(
        setCardPacksTotalCount({ cardPacksTotalCount: res.data.cardPacksTotalCount }),
      );
    })
    .catch((err: AxiosError) => dispatch(setAppError({ error: err.message })))
    .finally(() => dispatch(setPackStatus({ status: 'success' })));
};
