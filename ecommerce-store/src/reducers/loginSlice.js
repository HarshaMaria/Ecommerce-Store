import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8081/v1/user/login', { email, password });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: { user: null, error: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      });
  },
});

export default loginSlice.reducer;