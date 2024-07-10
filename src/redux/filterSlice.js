import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'bouquets',
  minPrice: '',
  maxPrice: '',
  category: '',
  search: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setType(state, action) {
      state.type = action.payload;
    },
    setMinPrice(state, action) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setFilters(state, action) {
      return { ...state, ...action.payload };
    },
    clearFilters(state) {
      state.type = '';
      state.minPrice = '';
      state.maxPrice = '';
      state.category = '';
    },
  },
});

export const { setType, setMinPrice, setMaxPrice, setCategory, setSearch, setFilters, clearFilters } = filterSlice.actions;

export default filterSlice.reducer;
