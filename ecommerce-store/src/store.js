import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartSlice';
import gamesReducer from './reducers/gamesSlice';
import userReducer from './reducers/userSlice';
import productsReducer from './reducers/productsSlice';
import checkoutReducer from './reducers/checkoutSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    games: gamesReducer,
    user: userReducer,
    products: productsReducer,
    checkout: checkoutReducer,
  },
});

export default store;