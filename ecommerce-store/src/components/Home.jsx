import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Games from '../games';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, fetchCartItemsCount } from '../reducers/homeSlice';

const Home = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.home.games);
  const cartItemCount = useSelector((state) => state.home.cartItemCount);
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.login.user)
  console.log(token)

  useEffect(() => {
    dispatch(fetchGames({token}));
    dispatch(fetchCartItemsCount(userId));
  }, [userId, dispatch]);

  const setLogout = () => {
    localStorage.removeItem('LoginId');
    window.location.reload(false);
    navigate('/login');
  };

  return (
    <div className="container mx-auto mt-[12px]">
      <div className="mt-[-48px] mb-[12px] mr-[48px]">
       <div className="flex justify-end gap-4 mr-[-24px]">
         <Link to={`/cart/${userId}`}> 
          <ShoppingCartIcon className="mt-[-4px]" fontSize="large" onClick={() => console.log('Go to cart')} />
          {cartItemCount > 0 && (
          <span className="text-green-700  absolute top-0 bg-green-600 text-black rounded-full w-4 h-4 flex items-center justify-center text-xs mt-[40px] ml-[20px]">{cartItemCount}</span>
          )}
         </Link>
         <Link to="/add-product">
          <button className="mt-[4px] text-black-600"><AddIcon />
           Add Product
          </button>
         </Link> 
         <Link to="/Login">
         <button className="text-red-800 font-bold py-2 px-4 rounded m-1 cursor-pointer mt-[-4px] mr-[-24px]" onClick={() => setLogout()}>  {/* onClick={() =>handleLogout()} */}
          Logout
         </button>
         </Link>       
       </div> 
      </div>
      <div className="grid grid-cols-4 gap-4 w-100 mb-0">
        {games && games.map((game,index) => (
          <div key={game.gameId} className="border p-4 bg-orange-200 rounded-lg shadow-md">
           <div className="mx-auto w-[auto]">
            <h2 className="text-xl font-semibold">{game.name}</h2>
            <img src={Games[index].imageUrl} alt={game.name} className="my-2 w-32 h-32 object-cover" />
            <p className="text-gray-700">{game.description}</p>
            <p className="text-gray-700">Price: ${game.price}</p>
            <Link to={`/game/${userId}/${game.gameId}`}>
              <button className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 flex">
                View Game
              </button>
            </Link>
           </div> 
          </div>
        ))}
      </div>
    </div>  
  );
};

export default Home;