// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'user',
//   initialState: null,
//   reducers: {
//     loginUser: (state, action) => {
//       return action.payload; 
//     },
//     logoutUser: () => null,
//   },
// });

// export const { loginUser, logoutUser } = userSlice.actions;
// export default userSlice.reducer;




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signup = createAsyncThunk(
  'user/signup',
  async ({ email, password, username }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8081/v1/user/signup', {
        email,
        password,
        username,
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
