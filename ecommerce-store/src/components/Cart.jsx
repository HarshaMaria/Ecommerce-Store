import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchCartItems, removeFromCart } from '../reducers/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const cartItems = useSelector((state) => state.cart);
  const total = cartItems.reduce((total, item) => total + item.price * item.count, 0);
  const token = localStorage?.getItem('token') 
  const navigate = useNavigate();

  useEffect(() => {
    if(!token){
      navigate('/login');
    }
    else {
      dispatch(fetchCartItems({token}));
    }
  }, [dispatch, userId]);

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart({ gameId: item.gameId, userId, token }));
    const cart = cartItems.filter(game => game.gameId !== item.gameId)
    
  };

  return (
    <div className="mt-[24px]"> 
      <div className="border p-4 bg-purple-200 w-[1000px]">
        <h2 className="text-4xl font-bold mb-4">Your Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div>
            <p>Your Shopping cart is empty.</p>
            <Link to={"/"}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                Back to Home
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <ul>
              {cartItems && cartItems.map((item) => (
                <div key={item.gameId}>
                  <p>{item.name} - ${item.price}</p>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 ml-4" onClick={() => handleRemoveFromCart(item)}>
                    Remove
                  </button>
                </div>
              ))} 
            </ul>
            <p className="text-xl font-semibold mt-4">Total Price: ${total}</p>
            <Link to={"/"}>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 flex">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>  
  );
};

export default Cart;
