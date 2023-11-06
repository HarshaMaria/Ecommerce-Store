import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../reducers/cartSlice';

const Cart = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = item => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your Shopping cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.name} - ${item.price}
                <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
              </li>
            ))}
          </ul>
          <p className="text-xl font-semibold mt-4">Total Price: ${total}</p>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleClearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;