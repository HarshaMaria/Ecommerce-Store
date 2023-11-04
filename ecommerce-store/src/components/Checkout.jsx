
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../reducers/cartSlice';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="border p-4">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add items to your cart before proceeding to checkout.</p>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-2">Cart Items:</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <p className="text-gray-700 mt-4">Total: ${cartItems.reduce((total, item) => total + item.price, 0)}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          {/* Add payment form and checkout logic here */}
        </div>
      )}
    </div>
  );
};

export default Checkout;
