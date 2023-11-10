import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../reducers/cartSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [games, setGames] = useState([]);


  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/cart/all')
      .then(response => {
        // Handle successful response
        const array = response.data.map(item => item.gameId);
        const uniqueTargetIds = [...new Set(array)];
        setData(uniqueTargetIds);
  
        // Second Axios GET request inside the .then() block of the first request
    axios.get('http://localhost:8080/games')
      .then(response => {
        // Handle successful response
        const filteredGames = response.data.filter(game => uniqueTargetIds.includes(game.id));
        console.log(filteredGames)
        setGames(filteredGames);
        setIsLoading(false);
        })
        .catch(error => {
          //error for req1
          setError(error);
          setIsLoading(false);
        });
  
      })
      .catch(error => {
        setError(error);
      });
  }, []);
  

  const handleRemoveFromCart = item => {
    axios.delete(`http://localhost:8080/cart/${item.id}`)
      .then(response => {
        dispatch(removeFromCart(item));
        console.log('Item removed from cart:', item);
      })
      .catch(error => {
        console.error('Error removing item from cart:', error);
      });
  };

  const handleClearCart = () => {

    dispatch(clearCart());
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">Your Shopping Cart</h2>
      {games.length === 0 ? (
        <div>
          <p>Your Shopping cart is empty.</p>
          <Link to="/home">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
              Back to Home
            </button>
          </Link>
        </div>
      ) : (
        <div>
      <div>
        {games.map(game => (
          <div key={game.id} className="game-item">
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <p>Price: ${game.price}</p>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 ml-4" onClick={() => handleRemoveFromCart(games.id)}>
            Remove
          </button>
          </div>
        ))}
      </div>
          <p className="text-xl font-semibold mt-4">Total Price: ${total}</p>


          <Link to="/checkout">
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
