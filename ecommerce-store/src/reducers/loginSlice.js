import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async ({ email, password }) => {
    console.log(email, password)
    try {
      const response = await axios.post('http://localhost:8081/v1/user/login', { email, password });
      console.log(response.data)

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: { user: localStorage.getItem("token") || null, error: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        localStorage.setItem("token", action.payload.token)
        state.error = "no error"

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = null
      });
  },
});

export default loginSlice.reducer;