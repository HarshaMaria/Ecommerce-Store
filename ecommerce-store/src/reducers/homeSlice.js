import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGames = createAsyncThunk(
  'home/fetchGames',
  async () => {
    const response = await axios.get('http://localhost:8081/games');
    return response.data;
  }
);

export const fetchCartItemsCount = createAsyncThunk(
  'home/fetchCartItemsCount',
  async (userId) => {
    const response = await axios.get(`http://localhost:8081/carts/items?userId=${userId}`);
    return response.data;
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
