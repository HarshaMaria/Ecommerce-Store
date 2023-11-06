import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reducers/cartSlice';
import { Link } from 'react-router-dom';
import games from '../games';

const GameDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const game = games.find((game) => game.id === parseInt(id));

  if (!game) {
    return <div>Game not found!</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(game));
    alert('Game added to cart!');
  };
  const handleBuyNow = () => {
    dispatch(buynow(game));
    alert('Buy Now clicked! Implement Buy Now logic here.');
  };


  return (
    <div className="border p-4">
      <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
      <img src={game.imageUrl} alt={game.name} className="mb-2 w-64 h-64 object-cover" />
      <p className="text-gray-700 mb-2">{game.description}</p>
      <p className="text-gray-700">Price: ${game.price}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 flex" onClick={handleAddToCart}>
        Add to Cart
      </button>
      <Link to="/Cart">
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex mt-2" onClick={handleBuyNow}>
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