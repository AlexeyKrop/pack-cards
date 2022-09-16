import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  packName: '',
  min: 0,
  max: 9,
  sortPacks: '',
  page: 1 as number | undefined,
  pageCount: 4 as number | undefined,
  user_id: '',
};

const packsParamsSlice = createSlice({
  name: 'packsParams',
  initialState,
  reducers: {
    setChangePage: (
      state,
      action: PayloadAction<{ currentPage: number | undefined }>,
    ) => {
      state.page = action.payload.currentPage;
    },
    setChangePageSize: (
      state,
      action: PayloadAction<{ pageCount: number | undefined }>,
    ) => {
      state.pageCount = action.payload.pageCount;
    },
    searchPackName: (state, action: PayloadAction<{ packName: string }>) => {
      state.packName = action.payload.packName;
    },
    setMyCardsPack: (state, action: PayloadAction<{ id: string }>) => {
      state.user_id = action.payload.id;
    },
    setFilterForMinCountCards: (state, action: PayloadAction<{ min: number }>) => {
      state.min = action.payload.min;
    },
    setFilterForMaxCountCards: (state, action: PayloadAction<{ max: number }>) => {
      state.max = action.payload.max;
    },
  },
});

export const packsParamsReducer = packsParamsSlice.reducer;
export const {
  setChangePage,
  setChangePageSize,
  searchPackName,
  setMyCardsPack,
  setFilterForMinCountCards,
  setFilterForMaxCountCards,
} = packsParamsSlice.actions;
