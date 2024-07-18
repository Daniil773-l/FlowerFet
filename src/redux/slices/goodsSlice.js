import { createSlice } from '@reduxjs/toolkit';
import {fetchGoods} from '../thunks/fetchGoods';


const initialState = {
  items: [],
  status: 'idle',
  error: null,
  type: 'bouquets',
  categories: [],
}

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = 'loading';
        state.categories = [];
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = 'successed';
        state.items = action.payload;
        action.payload.forEach(product => {
          if (product.categories) {
            product.categories.forEach(category => {
              if (!state.categories.includes(category)) {
                state.categories.push(category);
              }
            });
          }
        });
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
  },
});

export default goodsSlice.reducer;