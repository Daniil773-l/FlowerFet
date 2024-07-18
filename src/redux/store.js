import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'
import orderReducer from './slices/orderSlice'
import goodsReducer from './slices/goodsSlice'
import filtersReducer from './slices/filtersSlice'
// import dateReducer from './slices/dateSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    goods: goodsReducer,
    filters: filtersReducer,
    // date: dateReducer,
  }
});

export default store;