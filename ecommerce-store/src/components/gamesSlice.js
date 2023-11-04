import { createSlice } from '@reduxjs/toolkit';

const gamesSlice = createSlice({
  name: 'games',
  initialState: [],
  reducers: {
    addNewGame: (state, action) => {
      state.push(action.payload);
    },
    // ... other reducers ...
  },
});

export const { addNewGame } = gamesSlice.actions;
export default gamesSlice.reducer;
