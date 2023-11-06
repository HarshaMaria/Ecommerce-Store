import { createSlice } from '@reduxjs/toolkit';

const gamesSlice = createSlice({
  name: 'games',
  initialState: [],
  reducers: {
    addNewGame: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addNewGame } = gamesSlice.actions;
export default gamesSlice.reducer;

