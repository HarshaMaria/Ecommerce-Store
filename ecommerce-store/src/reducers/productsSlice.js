import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product) => {
    const response = await axios.post('http://localhost:8081/v1/user/games', product);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export default productsSlice.reducer;