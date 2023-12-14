import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async ({userId, token}) => {
    const response = await axios.get(`${BASE_URL}/v1/carts`, { headers:{
      Authorization: `Bearer ${token}`
    }});
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ gameId, userId, token }) => {
    const response = await axios.delete(`${BASE_URL}/v1/carts/${gameId}`, { headers:{
      Authorization: `Bearer ${token}`
    }});
    return gameId;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    clearCart: () => [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        return state.filter(item => item.gameId !== action.payload);
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;