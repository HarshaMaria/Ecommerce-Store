import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartSlice';
import gamesReducer from './reducers/gamesSlice';
import userReducer from './reducers/userSlice';
import productsReducer from './reducers/productsSlice';
import loginReducer from './reducers/loginSlice';
import homeReducer from './reducers/homeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    home: homeReducer,
    cart: cartReducer,
    games: gamesReducer,
    products: productsReducer,
  },
});

export default store;