import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, Sort } from "./types";

const initialState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности (по убыванию)",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },

    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<any>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSort, setPage, setSearch, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
