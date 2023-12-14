import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchGames = createAsyncThunk(
  'home/fetchGames',
  async ({ token }) => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/games`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCartItemsCount = createAsyncThunk(
  'home/fetchCartItemsCount',
  async ({ token }) => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/carts/items`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState: { games: [], cartItemCount: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.games = action.payload;
      })
      .addCase(fetchCartItemsCount.fulfilled, (state, action) => {
        state.cartItemCount = action.payload;
      });
  },
});

export default homeSlice.reducer;
