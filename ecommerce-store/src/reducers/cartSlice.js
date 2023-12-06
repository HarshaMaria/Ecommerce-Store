import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId) => {
    const response = await axios.get(`http://localhost:8081/carts?userId=${userId}`);
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ gameId, userId }) => {
    const response = await axios.delete(`http://localhost:8081/carts/${gameId}?userId=${userId}`);
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
        return state.filter(item => item.id !== action.payload.id);
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;