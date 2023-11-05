import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    loginUser: (state, action) => {
      // Handle user authentication logic and set the user data in the state
      // For example, call your backend API to verify user credentials
      return action.payload; // Set user data in the state upon successful login
    },
    logoutUser: () => null,
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
