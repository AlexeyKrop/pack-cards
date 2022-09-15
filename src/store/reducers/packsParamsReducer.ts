import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  packName: '',
  min: 0,
  max: 9,
  sortPacks: '',
  page: 1,
  pageCount: 4,
  user_id: '',
};

const packsParamsSlice = createSlice({
  name: 'packsParams',
  initialState,
  reducers: {
    setChangePage: (state, action: PayloadAction<{ current: any; pageSize: any }>) => {
      state.page = action.payload.current;
      state.pageCount = action.payload.pageSize;
    },
  },
});

export const packsParamsReducer = packsParamsSlice.reducer;
export const { setChangePage } = packsParamsSlice.actions;
