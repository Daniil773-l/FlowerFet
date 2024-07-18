import {createAsyncThunk} from '@reduxjs/toolkit';
import {API_URL} from '../../const';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue}) => {
  try {
    const response = await fetch(`${API_URL}/api/cart`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});