import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartSlice';
import gamesReducer from './reducers/gamesSlice';
import userReducer from './reducers/userSlice';
import productsReducer from './reducers/productsSlice';
import loginReducer from './reducers/loginSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    cart: cartReducer,
    games: gamesReducer,
    user: userReducer,
    products: productsReducer,
  },
});

export default store;