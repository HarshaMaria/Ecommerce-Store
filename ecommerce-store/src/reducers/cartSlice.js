import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async ({userId, token}) => {
    const response = await axios.get(`http://localhost:8081/v1/carts`, { headers:{
      Authorization: `Bearer ${token}`
    }});
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ gameId, userId, token }) => {
    const response = await axios.delete(`http://localhost:8081/v1/carts/${gameId}`, { headers:{
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