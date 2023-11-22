import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../reducers/cartSlice';
import { Link,useParams } from 'react-router-dom';
import axios from 'axios';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(null)
  const { userId } = useParams();

  useEffect(() => {
    console.log(userId)
    axios.get(`http://localhost:8081/games/carts?userId=${userId}`)
      .then((response) => {
        setCartItems(response.data);
        console.log('Cart items:', response.data); 
        const totalPrices = response.data.reduce((total, item) => {
          const itemTotalPrice = item.price * item.count;
          return total + itemTotalPrice; 
        }, 0);
        console.log(totalPrices)
        setTotal(totalPrices);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  const handleRemoveFromCart = async item => {
    try {
      console.log(item.gameId, userId)
      const response = await axios.delete(`http://localhost:8081/games/carts/${item.gameId}?userId=${userId}`);
      if (response.status === 200) {
        dispatch(removeFromCart(item));
        window.location.reload();
        // Updated cart
        axios.get(`http://localhost:8081/games/carts?userId=${userId}`)
          .then((response) => {
            setCartItems(response.data);
            console.log('Updated cart items:', response.data);  
            setTotal(0);
          })
          .catch((error) => {
            console.error("Error fetching updated cart items:", error);
          });
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // const handleClearCart = () => {
  //   dispatch(clearCart());
  // };

  return (
    <div className="border p-4 bg-purple-200">
      <h2 className="text-4xl font-bold mb-4">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>
        <p>Your Shopping cart is empty.</p>
        <Link to={`/home/${userId}`}>
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
          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleClearCart}>
            Clear Cart
          </button> */}
          <Link to={`/home/${userId}`}>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 flex">
            Proceed to Checkout
          </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
