import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, fetchCartItemsCount } from '../reducers/homeSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const Home = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.home.games);
  const cartItemCount = useSelector((state) => state.home.cartItemCount);
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = localStorage?.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
    dispatch(fetchGames({token}));
    dispatch(fetchCartItemsCount({token}));
    }
  }, [userId, token, dispatch]);

  const setLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mx-auto mt-[12px]">
      <div className="mt-[-48px] mb-[12px] mr-[48px]">
       <div className="flex justify-end gap-4 mr-[-24px]">
         <Link to={"/cart"}> 
          <ShoppingCartIcon className="mt-[-2px]" fontSize="large" onClick={() => console.log('Go to cart')} />
          {cartItemCount > 0 && (
          <span className="text-green-700  absolute top-0 bg-red-400 text-white font-bold rounded-full w-4 h-4 flex items-center justify-center text-xs mt-[50px] ml-[20px]">{cartItemCount}</span>
          )}
         </Link>
         <Link to="/add-product">
           <button style={{ transform: 'scale(1.1)' }} className="mt-[4px] text-black-800 ml-2">
            <AddCircleOutlineIcon />
           </button>
         </Link> 
         <Link to="/login">
           <button  style={{ transform: 'scale(1.1)' }} className="text-red-900 font-bold py-2 px-4 rounded m-1 cursor-pointer mt-[-4px] mr-[-24px]" onClick={() => setLogout()}>
            <ExitToAppIcon />
           </button>
         </Link>       
       </div> 
      </div>
      <div className="grid grid-cols-5 gap-4 w-100 mb-0">
        {games && games.map((game,index) => {
        return(
          <div key={game.gameId} className="border p-4 bg-pink-200 rounded-lg shadow-md">
           <div className="mx-auto w-[auto] ml-[8px]">
            <h2 className="text-xl font-semibold">{game.name}</h2>
            <img src={game?.imageUrl} alt={game.name} className="my-2 w-32 h-32 object-cover" />
            <p className="text-gray-700">{game.description}</p>
            <p className="text-gray-700">Price: ${game.price}</p>
            <Link to={`/game/${game.gameId}`}>
              <button className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 flex">
                View Game
              </button>
            </Link>
           </div> 
          </div>
        )})}
      </div>
    </div>  
  );
};

export default Home;