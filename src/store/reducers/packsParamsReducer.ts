import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  packName: '' as string | undefined,
  min: 0,
  max: 100,
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
    searchPackName: (state, action: PayloadAction<{ packName: string | undefined }>) => {
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
    setSortPack: (state, action: PayloadAction<{ value: string }>) => {
      state.sortPacks = `${action.payload.value}updated`;
    },
    setResetFilter: () => {
      return { ...initialState };
    },
  },
});

export const packsParamsReducer = packsParamsSlice.reducer;
export const {
  setSortPack,
  setChangePage,
  setChangePageSize,
  searchPackName,
  setMyCardsPack,
  setFilterForMinCountCards,
  setFilterForMaxCountCards,
  setResetFilter,
} = packsParamsSlice.actions;
