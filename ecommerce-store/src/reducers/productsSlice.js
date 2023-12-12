import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async ({product,token}) => {
    console.log(product,token)
    const response = await axios.post('http://localhost:8081/v1/games', product, { 
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
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