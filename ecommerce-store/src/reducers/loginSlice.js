import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  userId: null,
  showMessage: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setShowMessage: (state, action) => {
      state.showMessage = action.payload;
    },
  },
});

export const { setEmail, setPassword, setUserId, setShowMessage } = loginSlice.actions;
export default loginSlice.reducer;