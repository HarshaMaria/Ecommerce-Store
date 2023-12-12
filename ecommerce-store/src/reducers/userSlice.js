import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signup = createAsyncThunk(
  'user/signup',
  async ({ email, password, name }, thunkAPI) => {
    console.log(email,password, name)
    try {
      const response = await axios.post('http://localhost:8081/v1/user/signup', {
        email,
        password,
        name,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;