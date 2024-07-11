import { createSlice } from '@reduxjs/toolkit';
import {isNumber} from '../util';

const initialState = {
  type: 'bouquets',
  minPrice: '',
  maxPrice: '',
  category: '',
  search: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeType(state, action) {
      state.type = action.payload;
      state.minPrice = '';
      state.maxPrice = '';
      state.category = '';
      state.search = '';
    },
    changePrice(state, action) {
      if (isNumber(action.payload.value) || action.payload.value === '') {
        state[action.payload.name] = action.payload.value;
      }
    },
    // setType(state, action) {
    //   state.type = action.payload;
    // },
    // setMinPrice(state, action) {
    //   state.minPrice = action.payload;
    // },
    // setMaxPrice(state, action) {
    //   state.maxPrice = action.payload;
    // },
    // setCategory(state, action) {
    //   state.category = action.payload;
    // },
    // setSearch(state, action) {
    //   state.search = action.payload;
    // },
    // setFilters(state, action) {
    //   return { ...state, ...action.payload };
    // },
    // clearFilters(state) {
    //   state.type = '';
    //   state.minPrice = '';
    //   state.maxPrice = '';
    //   state.category = '';
    // },
  },
});

export const { changeType, changePrice, setType, setMinPrice, setMaxPrice, setCategory, setSearch, setFilters, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
