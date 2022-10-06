import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  AddCardsParamsType,
  cardsAPI,
  CardType,
  EditCardsParamsType,
} from '../../api/cards/cards';
import { restoreState } from '../../utils/localStorage';
import { AppThunk } from '../store';

import { RequestStatusType, setAppError } from './appReducer';

const initialState = {
  cards: [] as CardType[],
  cardsTotalCount: 3,
  packUserId: '',
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
    setCardsStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.cardsStatus = action.payload.status;
    },
  },
});

export const cardsReducer = cardsSlice.reducer;
export const { setCardsCard, setCardsCardTotalCount, setCardsStatus } =
  cardsSlice.actions;

// THUNK
export const setCardsCardTC =
  (cardsPack_id: string): AppThunk =>
  (dispatch, getState) => {
    const { cardsParams } = getState();

    dispatch(setCardsStatus({ status: 'loading' }));
    cardsAPI
      .setCardsCard({ ...cardsParams, cardsPack_id })
      .then(res => {
        dispatch(setCardsCard({ cards: res.data.cards }));
        dispatch(setCardsStatus({ status: 'success' }));
        dispatch(setCardsCardTotalCount({ cardsTotalCount: res.data.cardsTotalCount }));
      })
      .catch(err => dispatch(setAppError({ error: err.response.data.error })));
  };
export const createCardsCardTC =
  (params: AddCardsParamsType): AppThunk =>
  dispatch => {
    cardsAPI
      .createCardsCard(params)
      .then(() => {
        dispatch(setCardsCardTC(params.cardsPack_id));
      })
      .catch(err => {
        dispatch(setAppError({ error: err.response.data.error }));
      });
  };
export const editCardsCardTC =
  (params: EditCardsParamsType): AppThunk =>
  dispatch => {
    const getCardIdFromLocalStorage: () => string = () => {
      return restoreState<string>('cardsId', '');
    };
    const cardsPackID = getCardIdFromLocalStorage();

    cardsAPI
      .editCardsCard(params)
      .then(() => {
        dispatch(setCardsCardTC(cardsPackID));
      })
      .catch(err => {
        dispatch(setAppError({ error: err.response.data.error }));
      });
  };
