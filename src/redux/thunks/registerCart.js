import {createAsyncThunk} from '@reduxjs/toolkit';
import {API_URL} from '../../const';

export const registerCart = createAsyncThunk('cart/registerCart', async () => {
  const response = await fetch(`${API_URL}/api/cart/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to register cart');
  }
  const data = await response.json();
  return data;
});
