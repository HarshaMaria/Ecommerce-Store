import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: false,
  reducers: {
    completeCheckout: (state, action) => {
      return true; 
    },
    resetCheckout: (state, action) => {
      return false;
    },
  },
});

export const { completeCheckout, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
