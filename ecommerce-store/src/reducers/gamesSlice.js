import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGameDetails = createAsyncThunk(
  'games/fetchGameDetails',
  async (id) => {
    const response = await axios.get(`http://localhost:8081/games/${id}`);
    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  'games/fetchCartItems',
  async (userId) => {
    const response = await axios.get(`http://localhost:8081/carts?userId=${userId}`);
    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  'games/addToCart',
  async ({ gameId, userId }) => {
    try {
      await axios.post(`http://localhost:8081/carts/${gameId}/create?userId=${userId}`);
      alert('Game added to cart!');
    } catch (error) {
      console.error('Error adding game to cart:', error);
    }
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState: { gameDetails: {}, cartItems: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.gameDetails = action.payload;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      });
  },
});

export default gamesSlice.reducer;
