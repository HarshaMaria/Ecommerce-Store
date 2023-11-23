import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Games from '../games';
import axios from "axios";

const GameDetails = () => {
  const { userId,id } = useParams();
  const [game, setGame] = useState({});
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    // Fetch game details
    axios.get(`http://localhost:8081/games/${id}`)
      .then((response) => {
        setGame(response.data);
        console.log("Game by ID:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching game details:", error);
      });

    // View Cart
    axios.get(`http://localhost:8081/carts/${userId}`)
      .then((response) => {
        setCartItems(response.data);
        console.log('Cart items:', response.data);  
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, [id]);

  const handleAddToCart = () => {
    // Add the game to Cart
    console.log(id, userId)
    axios.post(`http://localhost:8081/carts/${id}/create?userId=${userId}`)
    .then(response => {
      console.log('Game added to cart:', response.data);
      alert('Game added to cart!');
    })
    .catch(error => {
      console.error('Error adding game to cart:', error);
    });
  };
  
  return (
   <div className="flex justify-center items-center mt-12"> 
    <div className="border p-8 w-80 bg-rose-200">
      <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
      <img src={Games[id-1].imageUrl} alt={game.name} className="mb-2 w-64 h-64 object-cover" />
      <p className="text-gray-700 mb-2">{game.description}</p>
      <p className="text-gray-700">Price: ${game.price}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex mt-2" onClick={handleAddToCart}>
        Add to Cart
      </button>
      <Link to={`/cart/${userId}`}>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex mt-2">
          View Cart
        </button>
      </Link>
      <Link to={`/home/${userId}`}>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
          Home
        </button>
      </Link>
    </div>
   </div> 
  );
};

export default GameDetails;
