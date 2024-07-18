import {createSlice} from '@reduxjs/toolkit';
import {sendOrder} from '../thunks/sendOrder';

const initialState = {
  isOpen: false,
  orderId: '',
  data: {
    buyerName: '',
    buyerPhone: '',
    recipientName: '',
    recipientPhone: '',
    street: '',
    house: '',
    apartment: '',
    paymentOnline: 'true',
    deliveryDate: '',
    deliveryTime: '',
  }
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  status: 'idle',
  error: null,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    clearOrder(state) {
      state.orderId = '';
      state.data = {
        buyerName: '',
        buyerPhone: '',
        recipientName: '',
        recipientPhone: '',
        street: '',
        house: '',
        apartment: '',
        paymentOnline: 'true',
        deliveryDate: '',
        deliveryTime: '',
      };
    },
    updateOrderData(state, action) {
      state.data = { ...state.data, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(sendOrder.pending, (state) => {
      state.orderId = '';
      state.status = 'loading';
    })
    .addCase(sendOrder.fulfilled, (state, action) => {
      state.status = 'successed';
      state.orderId = action.payload.orderId;
    })
    .addCase(sendOrder.rejected, (state, action) => {
      state.orderId = '';
      state.status = 'failed';
      state.error = action.payload || action.error.message;
    })

  }
});

export const {openModal, closeModal, clearOrder, updateOrderData} = orderSlice.actions;

export default orderSlice.reducer;
//rxslice