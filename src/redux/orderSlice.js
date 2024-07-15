import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL} from '../const';
import {fetchCart, toggleCart} from './cartSlice';

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

export const sendOrder = createAsyncThunk('order/sendOrder', async (_, {getState, dispatch}) => {
  const {
    order: {
      data: {
        buyerName,
        buyerPhone,
        recipientName,
        recipientPhone,
        street,
        house,
        apartment,
        paymentOnline,
        deliveryDate,
        deliveryTime,
      },
    },
  } = getState();
  const orderData = {
    buyer: {
      name: buyerName,
      phone: buyerPhone,
    },
    recipient: {
      name: recipientName,
      phone: recipientPhone,
    },
    address: `${street}, ${house}, ${apartment}`,
    paymentOnline,
    deliveryDate,
    deliveryTime,
  };

  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error('Failed to send order to server');
  }

  dispatch(clearOrder());
  dispatch(toggleCart());
  dispatch(fetchCart());
  return await response.json();
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
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
      state.status = 'loading';
    })
    .addCase(sendOrder.fulfilled, (state, action) => {
      state.status = 'successed';
      state.orderId = action.payload.orderId;
    })
    .addCase(sendOrder.rejected, (state) => {
      state.status = 'failed';
    })

  }
});

export const {openModal, closeModal, clearOrder, updateOrderData} = orderSlice.actions;

export default orderSlice.reducer;
//rxslice