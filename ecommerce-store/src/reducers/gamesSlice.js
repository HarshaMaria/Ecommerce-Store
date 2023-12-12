import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGameDetails = createAsyncThunk(
  'games/fetchGameDetails',
  async ({id, token}) => {
    const response = await axios.get(`http://localhost:8081/v1/games/${id}`, { headers:{
      Authorization: `Bearer ${token}`
    }});

    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  'games/fetchCartItems',
  async ({userId, token}) => {
    const response = await axios.get(`http://localhost:8081/v1/carts`, { headers:{
      Authorization: `Bearer ${token}`
    }});
    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  'games/addToCart',
  async ({ gameId, userId, token }) => {
    console.log(token, gameId);
    try {
      await axios.post(`http://localhost:8081/v1/carts/${gameId}/create`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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
        console.log(action.payload)
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      });
  },
});

export default gamesSlice.reducer;
