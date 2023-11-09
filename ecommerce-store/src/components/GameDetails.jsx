import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Games from '../games';
import axios from "axios";

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState();
  
  const userId = 24;

  useEffect(() => {
    // Fetch game details from the API endpoint
    axios.get(`http://localhost:8080/games/${id}`)
      .then((response) => {
        setGame(response.data);
        console.log("Game by ID:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching game details:", error);
      });

    // Fetch cart items for the current user from the API endpoint
    axios.get(`http://localhost:8080/cart/all`)
      .then((response) => {
        setCartItems(response.data);
        console.log('Cart items:', response.data);  
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, [id]);

  const handleAddToCart = () => {
    // Perform a pre-addition action by sending a POST request to create a cart
    axios.post('http://localhost:8080/cart/create')
      .then(createCartResponse => {
        // If cart creation is successful, proceed to add the game to the cart
        const cartId = createCartResponse.data; // Assuming the response contains the cart ID
        axios.post(`http://localhost:8080/cart/${cartId}/addGame`, {
          "gameId": id,
          "count": 1
        })
        .then(response => {
          console.log('Game added to cart:', response.data);
          alert('Game added to cart!');
        })
        .catch(error => {
          console.error('Error adding game to cart:', error);
        });
      })
      .catch(error => {
        console.error('Error creating cart:', error);
      });
  };
  
  const handleBuyNow = () => {
    alert('Buy Now clicked! Implement Buy Now logic here.');
  };

  return (
    <div className="border p-4">
      <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
      <img src={Games[id].imageUrl} alt={game.name} className="mb-2 w-64 h-64 object-cover" />
      <p className="text-gray-700 mb-2">{game.description}</p>
      <p className="text-gray-700">Price: ${game.price}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex mt-2" onClick={handleAddToCart}>
        Add to Cart
      </button>
      <Link to="/cart">
        <button className="bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded flex mt-2">
          View Cart
        </button>
      </Link>
      <Link to="/checkout">
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleBuyNow}>
        Buy Now
      </button>
      </Link>
    </div>
  );
};

export default GameDetails;
