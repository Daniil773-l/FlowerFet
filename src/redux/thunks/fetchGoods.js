import {createAsyncThunk} from '@reduxjs/toolkit';
import {API_URL} from '../../const';


export const fetchGoods = createAsyncThunk(
  'goods/fetchGoods',
  async (params, { rejectWithValue}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_URL}/api/products${queryString ? `?${queryString}` : ''}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
