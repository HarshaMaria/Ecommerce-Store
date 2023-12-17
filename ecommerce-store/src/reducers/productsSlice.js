import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async ({product,token}) => {
    const response = await axios.post(`${BASE_URL}/v1/games`, product, { 
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
