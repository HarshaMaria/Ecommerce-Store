import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Games from '../assets/games';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGameDetails, fetchCartItems, addToCart } from '../reducers/gamesSlice';

const GameDetails = () => {
  const dispatch = useDispatch();
  const { userId, id } = useParams();
  const game = useSelector((state) => state.games.gameDetails);
  const cartItems = useSelector((state) => state.games.cartItems);
  const token = useSelector((state) => state.login.user)

  useEffect(() => {
    dispatch(fetchGameDetails({id,token}));
    dispatch(fetchCartItems(userId));
  }, [dispatch, id, userId]);

  const handleAddToCart = () => {
    dispatch(addToCart({ gameId: id, userId,token }));
  };

  return (
    <div className="flex justify-center items-center mt-12"> 
      <div className="border p-8 w-80 bg-rose-200">
        <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
        <img src={game.imageUrl} alt={game.name} className="mb-2 w-64 h-64 object-cover" />
        <p className="text-gray-700 mb-2">{game.description}</p>
        <p className="text-gray-700">Price: ${game.price}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex mt-2" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <Link to={"/cart"}>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex mt-2">
            View Cart
          </button>
        </Link>
        <Link to={"/"}>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
            Home
          </button>
        </Link>
      </div>
    </div>  
  );
};

export default GameDetails;