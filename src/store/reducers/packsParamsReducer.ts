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
    searchPackNameAC: (state, action: PayloadAction<{ packName: string }>) => {
      state.packName = action.payload.packName;
    },
  },
});

export const packsParamsReducer = packsParamsSlice.reducer;
export const { setChangePage, setChangePageSize, searchPackNameAC } =
  packsParamsSlice.actions;
